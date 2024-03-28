import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { AiOutlinePlus } from "react-icons/ai";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  children1: any;
}

function Modal({
  modalOpen,
  setModalOpen,
  children,
  children1,
  title,
}: ModalProps) {
  return (
    <div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger className="w-full" asChild>
          {children1}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-center">{title}</h1>
            </DialogTitle>
            <DialogDescription>{children}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal;
