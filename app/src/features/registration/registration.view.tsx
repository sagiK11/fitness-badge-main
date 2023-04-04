import {
  Button,
  CardBody,
  CardTitle,
  Container,
  FlexBox,
  Form,
  RootLayout,
  Typography,
  ViewWrapper,
} from "@/components";
import { Card } from "@/components/card";
import { FormInput } from "@/components/form-input";
import { FormSelect } from "@/components/form-select";
import { Teacher } from "@/models";
import { useForm } from "react-hook-form";

export function RegistrationView() {
  const methods = useForm<Teacher>();
  return (
    <ViewWrapper>
      <RootLayout>
        <Container
          maxWidth="512px"
          as={Form}
          methods={methods}
          onSubmit={methods.handleSubmit((data) => console.log(data))}
          className="gap-8"
        >
          <Card className="bg-blue-200 shadow">
            <FlexBox className="justify-center">
              <CardTitle className="text-center">
                Complete your registration
              </CardTitle>
            </FlexBox>
            <CardBody className="items-center">
              <FlexBox className="flex-col w-full  gap-1">
                <Typography>My School</Typography>
                <FormSelect
                  name="schoolId"
                  options={[
                    { label: "hi", value: 1 },
                    { label: "hi", value: 2 },
                    { label: "hi", value: 3 },
                    { label: "hi", value: 4 },
                    { label: "hi", value: 5 },
                    { label: "hi", value: 6 },
                  ]}
                />
              </FlexBox>
              <FormInput name="firstName" placeholder="First name" />
              <FormInput name="lastName" placeholder="Last name" />
            </CardBody>
          </Card>
          <FlexBox className="justify-center">
            <Button className="btn-primary" type="submit">
              Submit
            </Button>
          </FlexBox>
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}
