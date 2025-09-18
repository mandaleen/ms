import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Users, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Class } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ClassCardProps {
  classItem: Class;
  onEdit: (classItem: Class) => void;
  onDelete: (classItem: Class) => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const ClassCard = ({ classItem, onEdit, onDelete }: ClassCardProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out">
        <div className={cn("relative w-full h-40 bg-gradient-to-br", classItem.color)}>
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/70 hover:bg-background/90">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(classItem)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(classItem)} className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardHeader>
          <CardTitle>Class {classItem.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{classItem.subject}</p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span>{classItem.studentCount} students</span>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClassCard;