// NOTE: Simple Variables in Rust

// fn main() {
//     // println!("Hello, world!");
//
//     // NOTE: Numbers
//     // i -> Signed Integer or u -> Unsigned Integer
//     // NOTE: If i dont assign anything after the name of the varible, the default is i32 anyways
//     let x: i8 = 1;
//
//     //NOTE: Where as an unsigned integer has to be positive -> We will get a compilation error
//     //anyways
//     // let a: u32 = -1000; UNCOMMENT to see the error i stated above
//     let y: u32 = 1000;
//
//     //NOTE: Floating point numbers we assign like so
//     let z: f32 = 1000.0123;
// }

//NOTE: BOOLEANS
fn main() {
    let is_male = false;
    let is_above_18 = true;

    if is_male {
        println!("You are a male!");
    } else {
        println!("You are not a male");
    }

    if is_male && is_above_18 {
        println!("You are a legal male!.");
    }
}
