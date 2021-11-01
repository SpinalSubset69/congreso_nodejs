const makeHttpError = require('../Helpers/makeHttpError');
const makeStudent = require('../Factory/student');
const Student = require('../Models/student');

const controller = {
    PutStudent: async (req, res) => {
            const userInfo = req.body;
            try{
                //Se Validan las propiedades enviadas desde el frontend
                const validateStudent = makeStudent(userInfo);     

                //Rellenamos el objeto de actividad
                const activity = {
                    name : userInfo.activity,
                    day : userInfo.day,
                    hour : userInfo.hour,
                    registerAt : userInfo.registerAt
                }     

                //Verificamos si existe el studiante el base de datos, de ser asi agregamos la actividad a su propiedad actividades
                const studentDb = await Student.findOne({'studentNumber' : userInfo.studentNumber});                                        
                if(studentDb){                                        
                    //Actualizamos los datos del estudiante
                    studentDb.name = userInfo.name;
                    studentDb.phone = userInfo.phone;
                    studentDb.email = userInfo.Email;
                    studentDb.career = userInfo.career;            

                    if(studentDb.IsActivityRegistered(userInfo.activity)){
                        await studentDb.save();
                        res.status(400).json({
                            statusCode: 400,
                            message: `Already registered on activity ${userInfo.activity}`
                        });   
                        return;                 
                    }                          
                    studentDb.AddActivity(activity);
                    await studentDb.save();
                    res.status(200).json({
                        statusCode: 200,
                        data: studentDb
                    });          
                    return;         
                }                                              

                //En caso de no existir en la base de datos se rea un nuevo registro y se le agrega la actividad enviada desde el frontend
                const student = new Student(validateStudent);   
                student.AddActivity(activity);
                await student.save();
                res.status(200).json(student);
                return;
            }catch(e){
                makeHttpError(res, e);
            }
    },
    GetStudents: async(req,res) => {
        try{
            const students = await Student.find();
            res.status(200).json({
                message: 'OK',
                numberStudents: students.length,
                data: students               
            })
        }catch(e){
            makeHttpError(res,e);
        }
    }
}

module.exports= controller;