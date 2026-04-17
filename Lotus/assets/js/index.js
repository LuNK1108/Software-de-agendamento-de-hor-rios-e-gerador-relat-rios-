document.addEventListener("DOMContentLoaded", () => {
    const html = `
        <p>Deseja logar com:</p>
        <div class="login-buttons">
            <button type="button" onclick="login_profissional()">Profissional</button>
            <button type="button" onclick="login_paciente()">Paciente</button>
        </div>
    `;
    document.getElementById('login').innerHTML = html;
});

function login_paciente() {
    const html = `
        <div class="login-form">
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Digite seu email" />

            <label for="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite sua senha" />

            <button type="button" onclick="entrar_paciente()">Entrar</button>
            <a href="../views/paciente/inserir.html">nao tem uma conta? cadastre aqui!</a>
           <a href='../views/config/index.html'>Configurçoes</a>
        
        </div>
    `;
    document.getElementById('login').innerHTML = html;
};

function login_profissional() {
    const html = `
        <div class="login-form">
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Digite seu email" />

            <label for="senha">Senha:</label>
            <input type="password" id="senha" placeholder="Digite sua senha" />

            <button type="button" onclick="entrar_profissional()">Entrar</button>
            <a href="../views/profissional/inserir.html">nao tem uma conta? cadastre aqui!</a>
            <a href='../views/config/index.html'>Configurçoes</a>
        
        </div>
    `;
    document.getElementById('login').innerHTML = html;
}

