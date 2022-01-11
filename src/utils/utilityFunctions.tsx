import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors'

const colors = [amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow]

enum ColorShades {
  c50 = 50, c100 = 100, c200 = 200, c300 = 300, c400 = 400, c500 = 500, c600 = 600, c700 = 700, c800 = 800, c900 = 900, A100 = "A100", A200 = "A200", A400 = "A400", A700 = "A700"
}

export const randomMaterialColor = () => {
  const colorProps: ColorShades[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, ColorShades.A100, ColorShades.A200, ColorShades.A400, ColorShades.A700]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const randomValue = colorProps[Math.floor(Math.random() * colorProps.length)]
  return randomColor[randomValue]
}
