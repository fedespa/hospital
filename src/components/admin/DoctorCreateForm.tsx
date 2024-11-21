"use client";

import { doctorRegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { useState, useTransition } from "react";
import { LockClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { createDoctor } from "@/actions/hospital/createDoctor";

function DoctorCreateForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof doctorRegisterSchema>>({
    resolver: zodResolver(doctorRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      specialty: "Cardiologist",
      availability: ""
    },
  });

  const onSubmit = (values: z.infer<typeof doctorRegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      
      createDoctor(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <div className="flex flex-col items-center bg-white p-4 rounded-lg min-w-80 max-[350px]:min-w-0 max-w-[520px]">
        <div className="text-center mb-3">
          <h1 className="bold text-xl flex items-center gap-1 justify-center">
            <LockClosedIcon width={20} height={20} />
            Register
          </h1>
          <p className="text-sm text-gray-500">Create a doctor</p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="johndoe@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Cardiologist, Dermatologist, ...."
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="14 PM - 20 PM, 8 AM - 16 PM"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create Doctor
          </Button>
        </form>
        <Link className="text-sm mt-3" href={"/auth/register"}>
          Already have an account?
        </Link>
      </div>
    </Form>
  );
}

export default DoctorCreateForm;
