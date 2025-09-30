import { AvatarList, Header, CardComponent, CustomTable } from "@/components"
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

  const mockTableData = {
    headers: ["Name", "Email", "Actopms"],
    rows: [
      [
        <span>Nome 1</span>,
        <span>Nome@email.23</span>,
        <button>Actioont</button>,
      ],
      [
        <span>Nome 1</span>,
        <span>Nome@email.23</span>,
        <button>Actioont</button>,
      ],
      [
        <span>Nome 1</span>,
        <span>Nome@email.23</span>,
        <button>Actioont</button>,
      ],
    ],
  }
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>CARD</CardComponent>
        <CardComponent>
          <AvatarList listData={mockListData}></AvatarList>
        </CardComponent>
        <CardComponent>
          <CustomTable
            headers={mockTableData.headers}
            rows={mockTableData.rows}
          />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
