# HASM Instrutions

## `say V`
- `V` is a number or a register - the value you want the computer to say  
-> `say 55` says `55`  
-> `say 2.5` says `2.5`

## `mov V R`
- `V` is a number or a register - the value you want to put into `R`  
- `R` is a register - the register to store the value in  
-> `mov 5 [a]` moves `5` into `[a]`  
-> `mov -7 [c]` moves `-7` into `[c]`  
-> `mov [a] [d]` moves the value in `[a]` into `[d]`  

## `add X Y R`
- `X` is a number or a register - the first thing to add  
- `Y` is a number or a register - the second thing to add  
- `R` is a register - the register to store the result in (`X` + `Y`)  
-> `add 5 10 [a]` adds `5` and `10` and stores it in `[a]`  
-> `add [b] 2 [b]` adds the value in `[b]` and `2` and stores it in `[b]`  
-> `add [a] [b] [c]` adds the value in `[a]` and the value in `[b]` and stores it in `[c]`  

## `sub X Y R`
- `X` is a number or a register - the thing to subtract `Y` from  
- `Y` is a number or a register - the thing to subtract from `X`  
- `R` is a register - the register to store the result in (`X` - `Y`)  
-> `add 5 10 [a]` subtracts `10` from `10` and stores it in `[a]`  
-> `add [b] 2 [b]` subtracts `2` from the value in `[b]` and stores it in `[b]`  
-> `add [a] [b] [c]` subtracts the value in `[b]` from the value in `[a]` and stores it in `[c]`  

## `mul X Y R`
- `X` is a number or a register - the first thing to multiply  
- `Y` is a number or a register - the second thing to multiply  
- `R` is a register - the register to store the result in (`X` * `Y`)  
-> `mul 5 10 [a]` multiplies `5` and `10` and stores it in `[a]`   
-> `mul [b] 2 [b]` multiplies the value in `[b]` and `2` and stores it in `[b]`  
-> `mul [a] [b] [c]` multiplies the value in `[a]` and the value in `[b]` and stores it in `[c]`  

## `div X Y R`
- `X` is a number or a register - the thing to divide  
- `Y` is a number or a register - the number to divide by  
- `R` is a register - the register to store the result in (`X` ÷ `Y`)  
-> `div 5 10 [a]` divides `5` by `10` and stores it in `[a]`  
-> `div [b] 2 [b]` divides the value in `[b]` by `2` and stores it in `[b]`  
-> `div [a] [b] [c]` divides the value in `[a]` by the value in `[b]` and stores it in `[c]`  

## `mod X Y R`
- `X` is a number or a register - the thing to divide  
- `Y` is a number or a register - the number to divide by  
- `R` is a register - the register to store the result in (`X` mod `Y`) (remainder of `X` ÷ `Y`)  
-> `mod 5 10 [a]` divides `5` by `10` and stores the remainder in `[a]`  
-> `mod [b] 2 [b]` divides the value in `[b]` by `2` and stores the remainder in `[b]`  
-> `mod [a] [b] [c]` divides the value in `[a]` by the value in `[b]` and stores the remainder in `[c]`  

## `slp T`
- `T` is a number or register - the time to wait in milliseconds  
-> `slp 5000` sleeps for `5000` milliseconds (5 seconds)  
-> `slp 200` sleeps for `200` milliseconds (0.2 seconds)  
-> `slp [a]` sleeps for the amount of milliseconds in `[a]`  

## `ieq`
```
ieq X Y {
    
}
```
- `X` is a number or register - the first thing to compare  
- `Y` is a number or register - the second thing to compare  
- the block (`{ }`) will be executed if `X` and `Y` are equal (`X` = `Y`)  

## `ine`
```
ine X Y {

}
```
- `X` is a number or register - the first thing to compare  
- `Y` is a number or register - the second thing to compare  
- the block (`{ }`) will be executed if `X` and `Y` are **NOT** equal (`X` ≠ `Y`)  

## `ilt`
```
ilt X Y {

}
```
- `X` is a number or register - the first thing to compare  
- `Y` is a number or register - the second thing to compare  
- the block (`{ }`) will be executed if `X` is less than `Y` (`X` < `Y`)  

## `igt`
```
igt X Y {

}
```
- `X` is a number or register - the first thing to compare  
- `Y` is a number or register - the second thing to compare  
- the block (`{ }`) will be executed if `X` is greater than `Y` (`X` > `Y`)  

## `ile`
```
ile X Y {

}
```
- `X` is a number or register - the first thing to compare  
- `Y` is a number or register - the second thing to compare  
- the block (`{ }`) will be executed if `X` is less than or equal to `Y` (`X` ≤ `Y`)  

## `ige`
```
ige X Y {

}
```
- `X` is a number or register - the first thing to compare  
- `Y` is a number or register - the second thing to compare  
- the block (`{ }`) will be executed if `X` is greater than or equal to `Y` (`X` ≥ `Y`)  

### TODO: LOOP INSTRUCTIONS
