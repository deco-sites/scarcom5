import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "../../components/minicart/Cart.tsx";
import Icon from "../../components/ui/Icon.tsx";
// import Logo from "../../components/ui/Logo.tsx";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useEffect, useRef } from "preact/compat";
import { getCookies } from "std/http/mod.ts";
import {
  INewsletterInputCheckboxProps,
  InputCheckboxNewsletterProps,
} from "../../components/newsletter/Newsletter.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { type SectionProps as SectionProps } from "@deco/deco";
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
  logo: ImageWidget;
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title newsletter message text?
   * @format html
   */
  text: string;
  /**
   * @title Days to reopen modal if it is registered
   */
  modalSignExpiredDate: number;
  /**
   * @title Days to reopen moda if it is closed
   */
  modalCloseExpiredDate: number;
}
interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}
export const loader = (props: Props, req: Request) => {
  const cookies = getCookies(req.headers);
  const cookieEmpty = req.method === "POST";
  const isOpen = cookieEmpty ? false : Boolean(!cookies["DecoNewsletterModal"]);
  return { ...props, isOpen };
};
function InputNewsletter(
  { name, placeholder, required, type }: InputNewletterProps,
) {
  return (
    <input
      name={name}
      type={type}
      class="input text-[#585858] lg:h-9 h-9 px-5 join-item w-full mb-2.5 first:mt-5 border-2 border-accent rounded-full placeholder:text-placeholder !outline-none lg:text-base text-xs"
      placeholder={placeholder}
      required={required}
    />
  );
}
function InputCheckboxNewsletter(
  { name, required, posLabel, preLabel }: InputCheckboxNewsletterProps,
) {
  return (
    <label
      class="w-full flex items-center justify-center gap-4"
      style={{ cursor: "pointer !important" }}
    >
      {!!preLabel && (
        <p class="text-base text-[#585858] text-left">{preLabel}</p>
      )}
      <input
        name={name}
        type="checkbox"
        style={{ width: "1.25rem" }}
        class="input h-5 flex-shrink-0 block outline-none p-0 border-accent checked:bg-primary"
        required={required}
      />
      {!!posLabel && (
        <p class="text-base text-[#585858] text-left">{posLabel}</p>
      )}
    </label>
  );
}
function NewsletterModal(
  { isOpen, form, text, modalSignExpiredDate, modalCloseExpiredDate, logo }:
    SectionProps<ReturnType<typeof loader>>,
) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const loading = useSignal(false);
  const success = useSignal(false);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    }
  }, [isOpen]);
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
      setCookieOnCloseModal("registered", modalSignExpiredDate);
      setTimeout(() => {
        success.value = false;
        modalRef.current?.close();
      }, 2000);
    }
  };
  const setCookieOnCloseModal = (
    cookieValue: string,
    expirationSeconds: number,
  ) => {
    // deno-lint-ignore no-var
    var date = new Date();
    date.setTime(date.getTime() + (expirationSeconds * 24 * 60 * 60 * 1000));
    // deno-lint-ignore no-var
    var expires = "expires=" + date.toUTCString();
    document.cookie = "DecoNewsletterModal" + "=" + cookieValue + ";" +
      expires +
      ";path=/";
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
    <>
      <dialog
        ref={modalRef}
        class="modal-time bg-black bg-opacity-70 items-center"
      >
        <form method="dialog" class="modal-box overflow-visible p-10 max-w-sm">
          <div class="flex text-secondary justify-center items-center absolute right-2 -top-10">
            <p class="font-normal text-sm">Não quero desconto</p>

            <button
              onClick={() =>
                setCookieOnCloseModal("closed", modalCloseExpiredDate)}
              class="btn btn-sm btn-circle btn-ghost focus:outline-none bg-transparent"
              aria-label="Fechar"
            >
              <Icon id="Close" width={20} height={20} />
            </button>
          </div>
          {success.value
            ? (
              <div class="text-base text-[#585858] text-center">
                E-mail cadastrado com sucesso!
              </div>
            )
            : (
              <>
                {
                  /* <Logo
                class="mx-auto mb-5 block"
                width={131}
                height={56}
              /> */
                }
                {logo && <img class="w-full" src={logo} alt={"logo"} />}
                <div
                  dangerouslySetInnerHTML={{ __html: text }}
                  class="text-base lg:text-xl text-center text-base-100 lg:pr-0 "
                />
                <form class="w-full form-control" onSubmit={handleSubmit}>
                  <div class="text-center">
                    {nameInput}
                    {emailInput}
                    {privacyContactInput}
                    <button
                      style={{
                        minWidth: "150px",
                      }}
                      type="submit"
                      class={`capitalize md:ml-5 mt-2.5 min-h-8 h-8 font-semibold btn rounded-full join-item btn-${
                        BUTTON_VARIANTS[form?.button?.variant as string] ||
                        BUTTON_VARIANTS["primary"]
                      }`}
                      disabled={loading}
                    >
                      {form?.button?.label || "Cadastrar"}
                    </button>
                  </div>
                </form>
              </>
            )}
        </form>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() =>
              setCookieOnCloseModal("closed", modalCloseExpiredDate)}
          >
            fechar
          </button>
        </form>
      </dialog>
    </>
  );
}
export default NewsletterModal;
