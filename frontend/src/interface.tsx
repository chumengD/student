export interface student{
    name:string,
    id:number,
    appearance:string,
    department:string,
    grade:string,
    from:string,
    contact:string,
    color:string,
    note?:string,
    scores:course[]
}

export interface test{
    stuNumber:number,
    course:number,
    courseName:string[],
    students:new_student[]
}

export interface new_student{
    name:string,
    id:number,
    scores:course[],
    average:number,
    sum:number,
}

export interface course{
    semester:number,
    name:string,
    score:number,
}



