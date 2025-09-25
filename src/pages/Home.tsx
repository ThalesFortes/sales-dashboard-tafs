import { AvatarList, Header, CardComponent } from "@/components"
import { Container } from "@mui/material"
import { currencyConverter } from "@/utils"

function Home() {
  const mockListData = [
    {
      avatar: "/avatar.svg",
      name: "nome",
      subtitle: currencyConverter(1234.55),
    },
    {
      avatar: "/avatar.svg",
      name: "nome",
      subtitle: currencyConverter(2334.05),
    },
    {
      avatar: "/avatar.svg",
      name: "nome",
      subtitle: currencyConverter(14.45),
    },
  ]
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>CARD</CardComponent>
        <CardComponent>
          <AvatarList listData={mockListData}></AvatarList>
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
