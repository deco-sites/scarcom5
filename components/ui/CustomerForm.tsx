import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Props {
  /**
   * @title Titulo do Formulário
   * @description Coloque sua Titulo do Formulário.
   */
  titleForm?: string;
  /**
   * @title Success Message
   * @description Coloque sua menssagem de sucesso.
   */
  successMessage?: string;

  /**
   * @title Form Data
   * @description Os dados do formulário.
   */
  formData?: FormProps;
}

export interface FormProps {
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  contatoFinanceiro: string;
}

function CustomerForm(props: Props) {
  const loading = useSignal(false);
  const success = useSignal(false);

  const getFormData = (form: HTMLFormElement): FormProps => ({
    razaoSocial: (form.elements.namedItem("razaoSocial") as RadioNodeList)
      ?.value,
    cnpj: (form.elements.namedItem("cnpj") as RadioNodeList)?.value,
    inscricaoEstadual:
      (form.elements.namedItem("inscricaoEstadual") as RadioNodeList)?.value,
    cep: (form.elements.namedItem("cep") as RadioNodeList)?.value,
    logradouro: (form.elements.namedItem("logradouro") as RadioNodeList)?.value,
    numero: (form.elements.namedItem("numero") as RadioNodeList)?.value,
    complemento: (form.elements.namedItem("complemento") as RadioNodeList)
      ?.value,
    bairro: (form.elements.namedItem("bairro") as RadioNodeList)?.value,
    cidade: (form.elements.namedItem("cidade") as RadioNodeList)?.value,
    estado: (form.elements.namedItem("estado") as RadioNodeList)?.value,
    telefone: (form.elements.namedItem("telefone") as RadioNodeList)?.value,
    email: (form.elements.namedItem("email") as RadioNodeList)?.value,
    contatoFinanceiro:
      (form.elements.namedItem("contatoFinanceiro") as RadioNodeList)?.value,
  });

  const handleSubmit = async (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    loading.value = true;

    try {
      const form = getFormData(e.currentTarget);

      const response = await fetch("/api/dataentities/CR/documents", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário.");
      }

      success.value = true;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
      setTimeout(() => (success.value = false), 5000);
    }
  };

  return (
    <div class="my-16 container">
      <h1 class="text-secondary text-[28px] font-medium leading-[36.4px] mb-5 border-b border-neutral-100 pb-[10px] md:block">
        {props.titleForm ?? "Formulário de Cadastro"}
      </h1>
      {success.value
        ? (
          <div class="text-base text-center lg:text-xl text-accent min-h-[400px]">
            {props.successMessage ??
              "Sua mensagem foi enviada, obrigado por entrar em contato conosco."}
          </div>
        )
        : (
          <form onSubmit={handleSubmit} class="text-sm flex flex-col gap-5">
            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="razaoSocial"
                >
                  Razão Social*
                </label>
                <input
                  required
                  id="razaoSocial"
                  placeholder="Digite a razão social"
                  name="razaoSocial"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="cnpj"
                >
                  CNPJ*
                </label>
                <input
                  required
                  id="cnpj"
                  placeholder="Digite o CNPJ"
                  name="cnpj"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
            </div>

            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="inscricaoEstadual"
                >
                  Inscrição Estadual*
                </label>
                <input
                  required
                  id="inscricaoEstadual"
                  placeholder="Digite a inscrição Estadual"
                  name="inscricaoEstadual"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="cep"
                >
                  CEP*
                </label>
                <input
                  required
                  id="cep"
                  placeholder="Digite o CEP"
                  name="cep"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
            </div>

            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <h3 class="font-medium text-currentColor font-semibold">
                  Endereço
                </h3>
              </div>
            </div>

            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="logradouro"
                >
                  Rua/Avenida*
                </label>
                <input
                  required
                  id="logradouro"
                  placeholder="Digite a Rua/Avenida"
                  name="logradouro"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="numero"
                >
                  Número*
                </label>
                <input
                  required
                  id="numero"
                  placeholder="Digite o número"
                  name="numero"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="complemento"
                >
                  Complemento
                </label>
                <input
                  id="complemento"
                  placeholder="Digite o complemento"
                  name="complemento"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
            </div>

            <div class="flex flex-col gap-5 lg:flex-row">
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="bairro"
                >
                  Bairro*
                </label>
                <input
                  required
                  id="bairro"
                  placeholder="Digite o bairro"
                  name="bairro"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="cidade"
                >
                  Cidade*
                </label>
                <input
                  required
                  id="cidade"
                  placeholder="Digite a cidade"
                  name="cidade"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
              <div class="form-control gap-[10px] w-full">
                <label
                  class="font-medium text-currentColor font-semibold"
                  htmlFor="estado"
                >
                  Estado*
                </label>
                <input
                  required
                  id="estado"
                  placeholder="Digite o estado"
                  name="estado"
                  type="text"
                  class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
                />
              </div>
            </div>

            <div class="form-control gap-[10px] w-full">
              <label
                class="font-medium text-currentColor font-semibold"
                htmlFor="telefone"
              >
                Telefone*
              </label>
              <input
                required
                id="telefone"
                placeholder="Digite o telefone"
                name="telefone"
                type="text"
                class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
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
                placeholder="Digite o email"
                name="email"
                type="email"
                class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
              />
            </div>

            <div class="form-control gap-[10px] w-full">
              <label
                class="font-medium text-currentColor font-semibold"
                htmlFor="contatoFinanceiro"
              >
                Contato Financeiro*
              </label>
              <input
                required
                id="contatoFinanceiro"
                placeholder="Digite o contato financeiro"
                name="contatoFinanceiro"
                type="text"
                class="input input-bordered input-xs h-[34px] border-2 border-neutral-100 !outline-none"
              />
            </div>

            <div class="flex justify-start mt-2">
              <button
                class="btn btn-primary md:btn-sm text-white min-h-[48px] w-24 border-0 rounded-none text-[13px] tracking-[1.4px] disabled:loading disabled:btn-disabled"
                disabled={loading.value}
              >
                {loading.value ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        )}
    </div>
  );
}

export default CustomerForm;
