type Weight = 'BOLD' | 'REGULAR' | 'SEMI_BOLD';

export default {
  BOLD: 'bold',
  REGULAR: 'normal',
  SEMI_BOLD: '600',
} as {
  [k in Weight]:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};
