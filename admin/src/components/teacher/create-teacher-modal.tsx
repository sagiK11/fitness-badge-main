import { useForm } from "react-hook-form";
import { Button } from "../button";
import { Modal, ModalAction } from "../modal";
import { Teacher } from "@/models";
import { FormInput } from "../form-input";
import { Form } from "../form";
import { FlexBox } from "../flexbox";
import { useCreateTeacher } from "@/hooks";
import React from "react";

type TeacherModalProps = {
  schoolId: string;
};

export function CreateTeacherModal({ schoolId }: TeacherModalProps) {
  const id = "create-teacher-modal";
  const { create } = useCreateTeacher({
    onSuccess: () => document.getElementById(id)?.click(),
  });

  const methods = useForm<Teacher>({
    mode: "onSubmit",
    defaultValues: {
      schoolId,
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  return (
    <>
      <Button as="label" className="btn-primary btn-sm" htmlFor={id}>
        Add Teacher
      </Button>

      <Modal header="Add Teacher" id={id}>
        <Form
          id="add-teacher-form"
          methods={methods}
          onSubmit={methods.handleSubmit(create)}
        >
          <FlexBox className="flex-col gap-2">
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              className="input-bordered"
            />
            <FormInput
              name="firstName"
              placeholder="First Name"
              className="input-bordered"
            />
            <FormInput
              name="lastName"
              placeholder="Last Name"
              className="input-bordered"
            />
          </FlexBox>

          <ModalAction>
            <Button
              className="btn-primary"
              form="add-teacher-form"
              type="submit"
            >
              Submit
            </Button>
          </ModalAction>
        </Form>
      </Modal>
    </>
  );
}
