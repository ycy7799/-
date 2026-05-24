import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("."));

// ==================== Pi Auth ====================

app.post("/api/auth/pi", async (req,res)=>{

    try{

        const { accessToken } = req.body;

        if(!accessToken){

            return res.status(400).json({
                success:false,
                error:"Missing access token"
            });
        }

        // 验证 token
        const response = await fetch(
            "https://api.minepi.com/v2/me",
            {
                method:"GET",
                headers:{
                    Authorization:
                    `Bearer ${accessToken}`
                }
            }
        );

        if(!response.ok){

            return res.status(401).json({
                success:false,
                error:"Invalid Pi token"
            });
        }

        const user = await response.json();

        // 此处可建立 session
        console.log("Pi User:",user);

        return res.json({
            success:true,
            user
        });

    }catch(err){

        console.error(err);

        return res.status(500).json({
            success:false,
            error:"Server auth failed"
        });
    }
});

// ==================== 启动 ====================

app.listen(PORT, ()=>{

    console.log(
        `🚀 Pi Game Running On ${PORT}`
    );
});