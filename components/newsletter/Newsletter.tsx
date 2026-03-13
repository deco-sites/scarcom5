import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "../../components/minicart/Cart.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface INewsletterInputProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title placeholder
   */
  placeholder?: string;
}

export interface INewsletterInputCheckboxProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title pre text?
   */
  preLabel?: string;
  /**
   * @title pos text?
   */
  posLabel?: string;
}

export interface INewsletterFormProps {
  email: INewsletterInputProps;
  name: INewsletterInputProps;
  privacyContact: INewsletterInputCheckboxProps;
  button: {
    /**
     * @title button variant
     * @default primary
     */
    variant?: ButtonVariant;
    /**
     * @title button label?
     * @default cadastrar
     */
    label?: string;
  };
}

export interface Props {
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title newsletter message text?
   * @format html
   */
  text: string;
}

interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

function InputNewsletter(
  { name, placeholder, required, type }: InputNewletterProps,
) {
  return (
    <input
      name={name}
      type={type}
      class="input lg:h-9 h-9 px-5 join-item w-full rounded-full placeholder:text-placeholder outline-none lg:text-base text-xs"
      placeholder={placeholder}
      required={required}
    />
  );
}

export interface InputCheckboxNewsletterProps {
  name: string;
  required: boolean;
  preLabel?: string;
  posLabel?: string;
}

function InputCheckboxNewsletter(
  { name, required, posLabel, preLabel }: InputCheckboxNewsletterProps,
) {
  return (
    <label
      class="w-full flex items-center justify-center gap-4 lg:justify-start"
      style={{ cursor: "pointer !important" }}
    >
      {!!preLabel && <p class="text-base-100">{preLabel}</p>}
      <input
        name={name}
        type="checkbox"
        style={{ width: "1.25rem" }}
        class="input h-5 flex-shrink-0 block outline-none p-0 checked:bg-primary"
        required={required}
      />
      {!!posLabel && <p class="text-base-100">{posLabel}</p>}
    </label>
  );
}

function Form(props: Props) {
  const { text, form } = props;
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit = async (
    e: JSX.TargetedEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    try {
      const formData = {
        email: "",
        name: "",
        privacyContact: false,
      };

      loading.value = true;

      if (!form?.email?.show) {
        formData.email =
          (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      }

      if (!form?.name?.show) {
        formData.name =
          (e.currentTarget.elements.namedItem("name") as RadioNodeList)
            ?.value;
      }

      if (!form?.privacyContact?.show) {
        formData.privacyContact = (e.currentTarget.querySelector(
          'input[name="privacyContact"]',
        ) as HTMLInputElement)?.checked;
      }

      // await subscribe({ email, name });
      // await Runtime.vtex.actions.newsletter.subscribe({ name, email });

      await fetch("/api/optin", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
          "accept": "application/json",
        },
      });
    } finally {
      loading.value = false;
      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };

  const emailInput = !form?.email?.show
    ? (
      <InputNewsletter
        name="email"
        required
        type="email"
        placeholder={form?.email?.placeholder || "E-mail"}
      />
    )
    : null;

  const nameInput = !form?.name?.show
    ? (
      <InputNewsletter
        name="name"
        type="text"
        placeholder={form?.name?.placeholder || "Nome"}
        required
      />
    )
    : null;

  const privacyContactInput = !form?.privacyContact?.show
    ? (
      <InputCheckboxNewsletter
        name="privacy-contact"
        posLabel={form?.privacyContact?.posLabel ||
          "Aceito receber ofertas e novidades por e-mail"}
        required={false}
      />
    )
    : null;

  return (
    <div class="flex flex-col lg:flex-row lg:items-start gap-2 lg:gap-10 py-7 w-full justify-between">
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        class="uppercase text-base lg:text-base text-left text-base-100 lg:max-w-xl max-w-xs lg:pr-0 pr-14"
      />
      {success.value
        ? (
          <div class="text-base lg:text-xl text-left text-base-100">
            E-mail cadastrado com sucesso!
          </div>
        )
        : (
          <form
            class="w-full form-control"
            onSubmit={handleSubmit}
          >
            <div class="flex gap-4 w-full mb-4 lg:flex-row flex-col items-center lg:justify-between justify-center">
              {nameInput}
              {emailInput}
              <button
                style={{
                  minWidth: "150px",
                }}
                type="submit"
                class={`mr-0 lg:mr-auto uppercase md:ml-5 font-medium btn min-h-0 h-9 disabled:loading rounded-full join-item btn-${
                  BUTTON_VARIANTS[form?.button?.variant as string] ||
                  BUTTON_VARIANTS["primary"]
                }`}
                disabled={loading}
              >
                {form?.button?.label || "Cadastrar"}
              </button>
            </div>
            {privacyContactInput}
          </form>
        )}
    </div>
  );
}

export default Form;
