import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Props {
  titleForm?: string;
  /**
   * @title newsletter message text?
   * @format html
   */
  successMessage?: string;
}

export interface FormProps {
  name: string;
  assunto: string;
  email: string;
  telefoneDDD: string;
  telefone: string;
  celularDDD: string;
  celular: string;
  pedido: string;
  // loja: string;
  cpf: string;
  mensagem: string;
}

function Form(_: Props) {
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit = async (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    try {
      loading.value = true;

      const assunto = (
        e.currentTarget.elements.namedItem("assunto") as RadioNodeList
      )?.value;
      const name = (e.currentTarget.elements.namedItem("nome") as RadioNodeList)
        ?.value;
      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;
      const telefoneDDD = (
        e.currentTarget.elements.namedItem("telefoneDDD") as RadioNodeList
      )?.value;
      const telefone = (
        e.currentTarget.elements.namedItem("telefone") as RadioNodeList
      )?.value;
      const celularDDD = (
        e.currentTarget.elements.namedItem("celularDDD") as RadioNodeList
      )?.value;
      const celular = (
        e.currentTarget.elements.namedItem("celular") as RadioNodeList
      )?.value;
      const pedido = (
        e.currentTarget.elements.namedItem("pedido") as RadioNodeList
      )?.value;
      const cpf = (e.currentTarget.elements.namedItem("cpf") as RadioNodeList)
        ?.value;
      const mensagem = (
        e.currentTarget.elements.namedItem("mensagem") as RadioNodeList
      )?.value;
      // const loja = (e.currentTarget.elements.namedItem("loja") as RadioNodeList)
      //   ?.value;

      const form: FormProps = {
        // assunto,
        // name,
        // email,
        // telefoneDDD,
        // telefone,
        // celularDDD,
        // celular,
        // pedido,
        // loja,
        // cpf,
        // mensagem,

        assunto,
        celular,
        celularDDD,
        cpf,
        email,
        mensagem,
        name,
        pedido,
        telefone,
        telefoneDDD,
      };

      const response = await fetch("/api/contactform", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      });

      console.log(response);
    } finally {
      loading.value = false;
      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };

  return (
    <div class="mb-32">
      {success.value
        ? (
          <div class="text-base text-center lg:text-xl text-accent min-h-[400px]">
            Sua mensagem foi enviada, obrigado por entrar em contato conosco.
          </div>
        )
        : (
          <form onSubmit={handleSubmit} class="text-sm flex flex-col gap-5">
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="assunto"
                >
                  Assunto*
                </label>
                <div class="flex gap-[10px]">
                  <select
                    required
                    id="assunto"
                    name="assunto"
                    class="select select-bordered select-xs h-[34px] w-full border-2 border-neutral-100 text-currentColor font-semibold font-normal"
                  >
                    <option disabled selected>
                      Tipo de solicitação
                    </option>
                    <option value="Esclarecer uma dúvida">
                      Esclarecer uma dúvida
                    </option>
                    <option value="Fazer uma sugestão">
                      Fazer uma sugestão
                    </option>
                    <option value="Fazer uma reclamação">
                      Fazer uma reclamação
                    </option>
                    <option value="Fazer um elogio">Fazer um elogio</option>
                    <option value="Troca e devolução">Troca e devolução</option>
                    <option value="Cancelamento">Cancelamento</option>
                    <option value="Desistência">Desistência</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="nome"
                >
                  Nome*
                </label>
                <input
                  required
                  id="nome"
                  placeholder="Digite seu nome"
                  name="nome"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 outline-none"
                />
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="email"
                >
                  Email*
                </label>
                <input
                  required
                  id="email"
                  placeholder="Digite seu e-mail"
                  name="email"
                  type="email"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 outline-none"
                />
              </div>
            </div>
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="telefoneDDD"
                >
                  Telefone*
                </label>
                <div class="flex gap-[10px]">
                  <input
                    required
                    placeholder="DDD"
                    id="telefoneDDD"
                    name="telefoneDDD"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-16 border-2 border-neutral-100"
                  />
                  <input
                    required
                    placeholder="Digite seu telefone"
                    name="telefone"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-full border-2 border-neutral-100"
                  />
                </div>
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="celularDDD"
                >
                  Celular
                </label>
                <div class="flex gap-[10px]">
                  <input
                    placeholder="DDD"
                    id="celularDDD"
                    name="celularDDD"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-16 border-2 border-neutral-100"
                  />
                  <input
                    placeholder="Digite seu celular"
                    name="celular"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-full border-2 border-neutral-100"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="loja"
                >
                  Selecione a loja
                </label>
                <div class="flex gap-[10px]">
                  <select
                    required
                    id="loja"
                    name="loja"
                    class="select select-bordered select-xs h-[34px] w-full border-2 border-neutral-100 text-currentColor font-semibold font-normal"
                  >
                    <option disabled selected>
                      Selecione a loja
                    </option>
                    <option value="virtual">Loja virtual</option>
                    <option value="fisica">Loja física</option>
                  </select>
                </div>
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="cpf"
                >
                  CPF
                </label>
                <div class="flex gap-[10px]">
                  <input
                    id="cpf"
                    placeholder="Digite seu CPF"
                    name="cpf"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-full border-2 border-neutral-100"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="cpf"
                >
                  Número do Pedido
                </label>
                <div class="flex gap-[10px]">
                  <input
                    id="numpedido"
                    placeholder="Digite o númerpo do seu pedido"
                    name="pedido"
                    type="text"
                    class="input input-bordered input-xs h-[34px] w-full border-2 border-neutral-100"
                  />
                </div>
              </div>
            </div>
            <div class="form-control gap-[10px]">
              <label
                class="font-medium text-currentColor font-semibold"
                htmlFor="message"
              >
                Comentários
              </label>
              <textarea
                id="message"
                placeholder="Deixe um comentário e, caso deseje cancelar sua compra, informe o motivo do cancelamento e o número do seu pedido.*"
                name="mensagem"
                type="text"
                class="textarea h-28 textarea-bordered resize-none w-full border-2 border-neutral-100"
              />
            </div>
            <div>
              <button class="btn btn-sm btn-primary hover:text-base-100 w-24 h-[34px]">
                Enviar
              </button>
            </div>
          </form>
        )}
    </div>
  );
}

export default Form;
