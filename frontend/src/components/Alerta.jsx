function Alerta({alerta}) {
    return (
        <p className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600' } text-center py-5 bg-gradient-to-br rounded-xl font-bold text-white text-sm mb-10`}>
            {alerta.msg}
        </p>
    );
}

export default Alerta;