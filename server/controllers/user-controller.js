import { UserModel } from '../model/user-model.js';
export const registerController = async (req, res) => {
    try {
        const { username, email, age, profilePhoto, password } = req.body;

        if (!username || !email || !age || !password) {
            console.log("All Fields are required");
            return res.status(400).send({ msg: "All Fields are Required" });
        }

        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            console.log("User Already Exists. Try another Email");
            return res.status(400).send({ msg: "User Already Exists. Try another Email" });
        }

        const user = await UserModel.create({ username, email, age, profilePhoto, password });
        const token = await user.generateToken();
        return res.status(201).json({
            msg: "User Created Successfully",
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePhoto: user.profilePhoto,
            isAdmin: user.isAdmin,
            token
        });

    } catch (error) {
        console.log("Error in Register Controller", error);
        return res.status(400).send({ msg: "Error in Register Controller" });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = await user.generateToken();
            return res.status(200).json({
                msg: "User Logged in Successfully",
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePhoto: user.profilePhoto,
                isAdmin: user.isAdmin,
                token
            });
        } else {
            return res.status(400).send({ msg: "Invalid Credentials" });
        }
    } catch (error) {
        console.log("Error in Login Controller", error);
        return res.status(500).send({ msg: "Internal Server Error" });
    }
};
