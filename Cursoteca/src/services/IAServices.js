import api from "./services";

const API_KEY = "";

export const gerarResumo = async (titulo, opcoes = {}) => {
  const { temperature = 0.7, max_tokens = 80, descricao = "" } = opcoes;

  try {
    const resposta = await api.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        temperature: temperature,
        max_tokens: max_tokens,   
        messages: [
          {
            role: "user",
            content: `
              Você é um assistente acadêmico. Faça um resumo simples, direto e objetivo sobre o curso acadêmico ou profissionalizante abaixo, explicando o que se aprende nele em até 3 parágrafos. Não cite filmes, diretores ou sinopses de cinema.

              Título do Curso: ${titulo}
              ${descricao ? `Descrição extra: ${descricao}` : ""}
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return resposta.data.choices[0].message.content;
  } catch (erro) {
    console.error(erro);
    return "Erro ao gerar resumo.";
  }
};