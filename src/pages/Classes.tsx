import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { classColors } from "@/data/mockData";
import type { Class } from "@/data/mockData";
import ClassCard from "@/components/classes/ClassCard";
import { showError, showSuccess } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const classLetters = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

const classFormSchema = z.object({
  name: z.enum(classLetters, { required_error: "You must select a Class ID." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Classes = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const { data: classes = [], isLoading } = useQuery<Class[]>({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("classes").select("*").order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const createClassMutation = useMutation({
    mutationFn: async (newClass: Omit<Class, "id" | "student_count" | "color">) => {
      const { data, error } = await supabase.from("classes").insert(newClass).select();
      if (error) throw new Error(error.message);
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      showSuccess("Class created successfully.");
      setIsFormOpen(false);
    },
    onError: (error) => showError(error.message),
  });

  const updateClassMutation = useMutation({
    mutationFn: async (updatedClass: Partial<Class> & { id: string }) => {
      const { data, error } = await supabase.from("classes").update({ name: updatedClass.name, subject: updatedClass.subject }).eq("id", updatedClass.id).select();
      if (error) throw new Error(error.message);
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      showSuccess("Class updated successfully.");
      setIsFormOpen(false);
      setSelectedClass(null);
    },
    onError: (error) => showError(error.message),
  });

  const deleteClassMutation = useMutation({
    mutationFn: async (classId: string) => {
      const { error } = await supabase.from("classes").delete().eq("id", classId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      showSuccess("Class deleted successfully.");
      setIsDeleteConfirmOpen(false);
      setSelectedClass(null);
    },
    onError: (error) => showError(error.message),
  });

  const form = useForm<z.infer<typeof classFormSchema>>({
    resolver: zodResolver(classFormSchema),
    defaultValues: { name: undefined, subject: "" },
  });

  const handleAddNew = () => {
    setSelectedClass(null);
    form.reset({ name: undefined, subject: "" });
    setIsFormOpen(true);
  };

  const handleEdit = (classItem: Class) => {
    setSelectedClass(classItem);
    form.reset({ name: classItem.name as any, subject: classItem.subject });
    setIsFormOpen(true);
  };

  const handleDelete = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClass) {
      deleteClassMutation.mutate(selectedClass.id);
    }
  };

  const onSubmit = (values: z.infer<typeof classFormSchema>) => {
    if (selectedClass) {
      updateClassMutation.mutate({ id: selectedClass.id, ...values });
    } else {
      const newClass = {
        ...values,
        student_count: 0,
        color: classColors[classes.length % classColors.length],
      };
      createClassMutation.mutate(newClass);
    }
  };

  const filteredClasses = useMemo(
    () =>
      classes.filter((c) =>
        c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `Class ${c.name}`.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [classes, searchTerm]
  );

  const pageContent = (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">My Classes</h1>
          <p className="text-muted-foreground">Manage your classes and view details.</p>
        </div>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Class
        </Button>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search classes..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      ) : filteredClasses.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={{...classItem, studentCount: classItem.student_count}}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-secondary/50">
          <h3 className="text-lg font-semibold">No Classes Found</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            {searchTerm ? `No classes match your search for "${searchTerm}". Try a different search term.` : "You haven't created any classes yet. Click the button to add your first one."}
          </p>
          {!searchTerm && (
            <Button onClick={handleAddNew} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create First Class
            </Button>
          )}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedClass ? "Edit Class" : "Create New Class"}</DialogTitle>
            <DialogDescription>
              Enter the details for your class below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class ID</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Class ID" />
                        </Trigger>
                      </FormControl>
                      <SelectContent>
                        {classLetters.map(letter => (
                          <SelectItem key={letter} value={letter}>Class {letter}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createClassMutation.isPending || updateClassMutation.isPending}>Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete Class {selectedClass?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleteClassMutation.isPending} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return pageContent;
};

export default Classes;