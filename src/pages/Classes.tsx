import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Search } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { mockClasses } from "@/data/mockData";
import type { Class } from "@/data/mockData";
import ClassCard from "@/components/classes/ClassCard";
import { showSuccess } from "@/utils/toast";

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
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

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
    form.reset({ name: classItem.name as "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H", subject: classItem.subject });
    setIsFormOpen(true);
  };

  const handleDelete = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClass) {
      setClasses(classes.filter((c) => c.id !== selectedClass.id));
      showSuccess(`Class ${selectedClass.name} deleted.`);
      setIsDeleteConfirmOpen(false);
      setSelectedClass(null);
    }
  };

  const onSubmit = (values: z.infer<typeof classFormSchema>) => {
    if (selectedClass) {
      // Edit
      setClasses(
        classes.map((c) =>
          c.id === selectedClass.id ? { ...c, ...values } : c
        )
      );
      showSuccess(`Class ${values.name} updated.`);
    } else {
      // Create
      const newClass: Class = {
        id: uuidv4(),
        ...values,
        studentCount: 0,
        imageUrl: `https://source.unsplash.com/random/400x300?${values.subject.toLowerCase()}`,
      };
      setClasses([newClass, ...classes]);
      showSuccess(`Class ${values.name} created.`);
    }
    setIsFormOpen(false);
    setSelectedClass(null);
  };

  const filteredClasses = useMemo(
    () =>
      classes.filter((c) =>
        c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `Class ${c.name}`.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [classes, searchTerm]
  );

  return (
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredClasses.map((classItem) => (
          <ClassCard
            key={classItem.id}
            classItem={classItem}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </motion.div>

      {/* Form Dialog */}
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
                        </SelectTrigger>
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
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Classes;