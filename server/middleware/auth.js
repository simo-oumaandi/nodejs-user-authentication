import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        } else {
            // GOOGLE AUTH 
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; // SUB IS BESICALLY GOOGLE'S NAME FOR DIFFERENTIATING ALL ID'S

        }
        next();
    } catch (error) {
        console.log(error);
    }
}



export default auth;