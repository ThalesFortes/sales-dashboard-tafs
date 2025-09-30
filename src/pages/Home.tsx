import {
  AvatarList,
  Header,
  CardComponent,
  CustomTable,
  CustomChart,
} from "@/components"
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
        <CardComponent>
          <CustomChart
            labels={["Jan", "Fev", "Mar", "Abr", "May"]}
            data={[1000.15, 2456.54, 896.32, 654.89, 754.89, 354.24]}
            type="bar"
          />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
