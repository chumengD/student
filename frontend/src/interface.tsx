// export interface student{
//     name:string,
//     id:number,
//     appearance:string,
//     department:string,
//     grade:string,
//     from:string,
//     contact:string,
//     color:string,
//     note?:string,
//     scores:course[]
// }

//返回给后端，需要处理的数据
export interface test{
    testName:string,
    stuNumber:number,
    course:number,
    courseName:string[],
    students:new_student[]
}


//单个学生的数据
export interface new_student{
    name:string,
    id:number,
    scores:number[],
    average?:number,
    sum?:number,
}




