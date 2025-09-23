import { Box, Container, Grid } from "@mui/material"
import {
  BannerImage,
  FormComponent,
  StyledH1,
  StyledP,
  Logo,
} from "@/components"
import { pxToRem } from "@/utils"

function Login() {
  return (
    <>
      <Box>
        <Grid container>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Container maxWidth="sm">
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <Logo height={41} width={100} />
              </Box>
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <StyledH1>Bem-vindo</StyledH1>
                <StyledP>Digite sua senha e email para logar</StyledP>
              </Box>
              <FormComponent
                inputs={[
                  { type: "email", placeholder: "Email" },
                  { type: "button", placeholder: "Senha" },
                ]}
                buttons={[
                  { className: "primary", type: "submit", children: "Login" },
                ]}
                message={{
                  msg: "Sucesso!",
                  type: "sucess",
                }}
              />
            </Container>
          </Grid>

          <Grid
            size={{ sm: 6 }}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <BannerImage />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Login
