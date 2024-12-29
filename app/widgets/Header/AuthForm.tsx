import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { forwardRef, useImperativeHandle, useState } from "react";

type FormMode = "register" | "login";

export type AuthFormHandler = {
  openDialog: (
    mode: FormMode
  ) => void;
  closeDialog: () => void;
};

const AuthForm = forwardRef<AuthFormHandler>((_, ref) => {
  const [data, setData] = useState({ isOpen: false, mode: "register" });

  const openDialog = (mode: FormMode) => {
    setData(prev => ({ ...prev, isOpen: true, mode: mode }));
  };

  const closeDialog = () => {
    setData(prev => ({ ...prev, isOpen: false }));
  };

  useImperativeHandle(ref, () => {
    return { openDialog, closeDialog };
  }, [])

  return (
    <Dialog 
      open={data.isOpen}
      onOpenChange={(e: boolean) => {
        if(!e) closeDialog();
        setData(prev => ({ ...prev, isOpen: e }));
      }}
    >
      <DialogContent>
        <DialogHeader>Hello world</DialogHeader>
        <p>This is where form goes</p>
      </DialogContent> 
    </Dialog>
  );
});

export default AuthForm;
