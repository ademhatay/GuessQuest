import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from '../ui/button'


interface ResponsiveModalProps {
  children: React.ReactNode,
  trigger: React.ReactNode,
  title: string,
  description?: string
}

const ResponsiveModal = ({ children, trigger, title, description }: ResponsiveModalProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="cursor-pointer" asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="min-w-[250px]">
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
            <DialogDescription>
              {description && description}
            </DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <Button variant="default" onClick={() => setOpen(false)} className='w-full'>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>
            {title}
          </DrawerTitle>
          <DrawerDescription>
            {description && description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="container">
          {children}
        </div>
        <DrawerFooter className='pt-2'>
        <DrawerClose asChild>
            <Button variant="default" className='w-full'>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ResponsiveModal
