function Footer() {
    return (
        <footer className={"py-10"}>
            <p className={"text-center font-semibold"}>APV - Administrador de pacientes de <span className={"text-indigo-600"}>Veterinaria</span></p>
            <p className={"text-center mt-5"}>Copyright &copy; { new Date().getFullYear() }</p>
        </footer>
    );
}

export default Footer;