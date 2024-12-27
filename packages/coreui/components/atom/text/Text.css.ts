import { style, styleVariants } from '@vanilla-extract/css';

export const fontStyle = style({
  fontFamily: 'Pretendard',
  transition: 'color .2s ease-out'
})

export const fontSize = styleVariants({
  t: [fontStyle, { 
    fontSize: '8px' 
  }],
  dxs: [fontStyle, { 
    fontSize: '10px' 
  }],
  xs: [fontStyle, { 
    fontSize: '12px' 
  }],
  s: [fontStyle, { 
    fontSize: '14px' 
  }],
  m: [fontStyle, { 
    fontSize: '16px' 
  }],
  l: [fontStyle, { 
    fontSize: '18px' 
  }],
  xl: [fontStyle, { 
    fontSize: '20px' 
  }],
  dxl: [fontStyle, { 
    fontSize: '24px' 
  }],
  h: [fontStyle, { 
    fontSize: '32px' 
  }],
  xh: [fontStyle, { 
    fontSize: '40px' 
  }], 
});
