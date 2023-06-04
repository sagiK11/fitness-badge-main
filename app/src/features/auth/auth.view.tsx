import {
  Button,
  CardBody,
  CardTitle,
  Container,
  RootLayout,
  ViewWrapper,
} from "@/components";
import { Card } from "@/components/card";
import { useAuth } from "@/hooks";
import { FcGoogle } from "react-icons/fc";

export function AuthView() {
  const { signIn } = useAuth();
  return (
    <ViewWrapper>
      <RootLayout>
        <Container maxWidth="512px" className="justify-center mt-[50px] ">
          <Card>
            <CardTitle className="justify-center">Log in with:</CardTitle>
            <CardBody className="items-center text-center">
              <Button className="btn-ghost" onClick={() => signIn()}>
                <FcGoogle size={30} />
              </Button>
            </CardBody>
          </Card>
        </Container>
      </RootLayout>
    </ViewWrapper>
  );
}
