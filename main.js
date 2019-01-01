console.clear();
console.log(new Date)
console.log("");

const xi = () => [0];
const sig = x => [x+1];

const pi = k => (...x) => {
  if(k === 0) { return []; }
 
  return [x[k-1]];
};

// combine
const comb = (...fs) => (...x) => reduce((acc, f) => [...acc, ...f(...x)], [], fs);

// compose
const comp = (...fs) => (...x) => reduce((acc, f) => f(...acc), x, reverse(fs));

// primitive recursion
const prim_rec = (g, h) => {
  const _f = (...attrs) => {
    const x = init(attrs);
    const y = last(attrs);
    
    if(y < 0) { console.warn("ERROR: y<0")}
    if(y === 0) return g(...x);
    
    const new_y = y - 1;
            
    return h(...x, new_y, ..._f(...x, new_y));
  };
  
  return _f;
};

const plus = prim_rec(pi(1), comp(sig, pi(3)));

const kappa = (m, n) => n === 0 ? comp(...new Array(m).fill(sig), xi) : prim_rec(kappa(m, n-1), pi(n+1));

const mult = prim_rec(kappa(0, 1), comp(plus, comb(pi(1), pi(3))));

const pow = prim_rec(kappa(1, 1), comp(mult, comb(pi(1), pi(3))));

const pred = prim_rec(xi, pi(1));

const monus = prim_rec(pi(1), comp(pred, pi(3)));

const eq = comp(monus, comb(kappa(1, 2), comp(plus, comb(comp(monus, comb(pi(2), pi(1))), comp(monus, comb(pi(1), pi(2)))))));

const neq = comp(monus, comb(kappa(1, 2), eq));

const I = i => x => eq(...monus(x, i), 0);

const fi = i => comp(monus, comb(I(i), I(i-1)));

const quo = (x, y) => {
  if(x === 0) return [0];
  x -= 1;
  
  const q = quo(x, y);
  
  return plus(...q, ...eq(...sig(x), ...plus(...mult(...q, y), y)));
};

