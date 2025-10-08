// COMPONENTS
import {
  AvatarList,
  Header,
  CardComponent,
  CustomTable,
  CustomChart,
  StyledH2,
  StyledH3,
  StyledSpan,
} from "@/components"
import { Container, Grid } from "@mui/material"

// HOOKS
import { useGet } from "@/hooks"

// UTILS
import { currencyConverter, highlightTextConverter } from "@/utils"

// TYPES
import type { HighlightsData, StarsData, NewsData } from "@/types"

function Home() {
  const {
    data: highlightsData,
    loading: highlightsLoading,
    error: highlightsError,
  } = useGet<HighlightsData[]>("sales/highlights")

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
    headers: ["Name", "Email", "Actions"],
    rows: [
      [
        <span>Nome 1</span>,
        <span>Nome@email.23</span>,
        <button>ACTION</button>,
      ],
      [
        <span>Nome 1</span>,
        <span>Nome@email.23</span>,
        <button>ACTION</button>,
      ],
      [
        <span>Nome 1</span>,
        <span>Nome@email.23</span>,
        <button>ACTION</button>,
      ],
    ],
  }
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {!highlightsError && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CardComponent
                  className={
                    highlightsLoading
                      ? "skeleton-loading skeleton-loading-mh-1"
                      : ""
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1">
                        Total de vendas no mês
                      </StyledH2>
                      <StyledH3 className="mb-1" size={40} lineheight={40}>
                        {currencyConverter(highlightsData[0].value)}
                      </StyledH3>
                      <StyledSpan>{highlightsData[0].subtitle}</StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CardComponent
                  className={
                    highlightsData
                      ? highlightsData[1].subtitle
                      : "skeletonLoading skeletonLoading-mh-1"
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1" color="white">
                        Meta do mês
                      </StyledH2>
                      <StyledH3
                        className="mb-1"
                        color="white"
                        size={40}
                        lineheight={40}
                      >
                        {currencyConverter(highlightsData[1].value)}
                      </StyledH3>
                      <StyledSpan color="white">
                        {highlightTextConverter(highlightsData[1].subtitle)}
                      </StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CardComponent
                  className={
                    highlightsLoading
                      ? "skeleton-loading skeleton-loading-mh-1"
                      : ""
                  }
                >
                  {!highlightsLoading && highlightsData && (
                    <>
                      <StyledH2 className="mb-1">Leads contactados</StyledH2>
                      <StyledH3 className="mb-1" size={40} lineheight={40}>
                        {highlightsData[2].value}
                      </StyledH3>
                      <StyledSpan>{highlightsData[2].subtitle}</StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12, md: 7 }}>
            <CardComponent>
              <StyledH2 className="mb-1">Valor de venda no mês</StyledH2>
              <CustomChart
                labels={["Jan", "Fev", "Mar", "Abr", "May"]}
                data={[1000.15, 2456.54, 896.32, 654.89, 754.89, 354.24]}
                type="line"
              />
            </CardComponent>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <CardComponent>
              <StyledH2 className="mb-1">Maiores vendedores do mês</StyledH2>
              <AvatarList listData={mockListData}></AvatarList>
            </CardComponent>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <CardComponent>
              <StyledH2 className="mb-1">Noticias relevantes</StyledH2>
              <CustomTable
                headers={mockTableData.headers}
                rows={mockTableData.rows}
              />
            </CardComponent>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <CardComponent>
              <StyledH2 className="mb-1">Valor de venda por mês</StyledH2>
              <CustomChart
                labels={["Jan", "Fev", "Mar", "Abr", "May"]}
                data={[1000.15, 2456.54, 896.32, 654.89, 754.89, 354.24]}
                type="bar"
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
