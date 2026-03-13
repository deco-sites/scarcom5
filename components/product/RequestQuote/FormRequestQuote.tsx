import { useState } from "preact/hooks";
import { JSX } from "preact";

function SendingSuccessfullyModal(
  { stateModal }: { stateModal: (value: boolean) => void },
) {
  return (
    <div class="flex flex-col items-center justify-center gap-[16px]">
      <div class="flex flex-col gap-[8px] items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="66"
          height="66"
          viewBox="0 0 66 66"
          fill="none"
        >
          <g clip-path="url(#clip0_4094_4664)">
            <path
              d="M14.0405 51.9595C11.6686 49.5877 13.2413 44.6041 12.0347 41.6857C10.7817 38.6719 6.1875 36.2227 6.1875 33C6.1875 29.7773 10.7817 27.3281 12.0347 24.3143C13.2413 21.3984 11.6686 16.4123 14.0405 14.0405C16.4123 11.6686 21.3984 13.2413 24.3143 12.0347C27.341 10.7817 29.7773 6.1875 33 6.1875C36.2227 6.1875 38.6719 10.7817 41.6857 12.0347C44.6041 13.2413 49.5877 11.6686 51.9595 14.0405C54.3314 16.4123 52.7588 21.3959 53.9653 24.3143C55.2183 27.341 59.8125 29.7773 59.8125 33C59.8125 36.2227 55.2183 38.6719 53.9653 41.6857C52.7588 44.6041 54.3314 49.5877 51.9595 51.9595C49.5877 54.3314 44.6041 52.7588 41.6857 53.9653C38.6719 55.2183 36.2227 59.8125 33 59.8125C29.7773 59.8125 27.3281 55.2183 24.3143 53.9653C21.3984 52.7588 16.4123 54.3314 14.0405 51.9595Z"
              stroke="#015388"
              stroke-width="4.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.6875 35.0625L28.875 41.25L43.3125 26.8125"
              stroke="#F6921E"
              stroke-width="4.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_4094_4664">
              <rect width="66" height="66" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span class="not-italic font-medium text-[24px] lg:text-[26px] lg:leading-[30px] leading-[28px] text-center text-[#015388]">
          Orçamento enviado <br /> com sucesso!
        </span>
      </div>
      <p class="m-0 not-italic font-normal text-[16px] leading-[20px] text-center text-[#848689]">
        Nossa equipe já está cuidando de tudo e logo entraremos em contato com a
        resposta. Agradecemos pela confiança e estamos ansiosos para ajudar
        você!
      </p>
      <button
        onClick={() => stateModal(false)}
        class="w-full flex flex-row justify-center items-center p-[16px] gap-[8px] bg-[#015388] border-2 border-[#015388] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-full not-italic font-bold text-[16px] leading-[16px] text-center uppercase text-white "
      >
        fechar
      </button>
    </div>
  );
}

function FormRequestQuote({ stateModal, productName }: {
  stateModal: (value: boolean) => void;
  productName: string;
}) {
  const [sendingSuccessfully, setSendingSuccessfully] = useState(false);
  const [product, _] = useState(productName);
  const [userName, setUserName] = useState("");
  const [surname, setSurName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [obs, setObs] = useState("");
  const [errors, setErrors] = useState({
    userName: false,
    surname: false,
    tel: false,
    email: false,
    quantity: false,
    obs: false,
  });

  const inputErrorStyle = "border-red-500";
  const inputNormalStyle = "border-[#9B9B9E]";

  const validateForm = () => {
    const newErrors = {
      userName: !userName,
      surname: !surname,
      tel: !tel,
      email: !email,
      quantity: !quantity,
      obs: !obs,
    };

    setErrors(newErrors);

    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();

    if (validateForm()) {
      const data = {
        email,
        lastname: surname,
        name: userName,
        observation: obs,
        phone: tel,
        product: product,
        quantity,
      };

      fetch("/api/dataentities/OR/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/vnd.vtex.ds.v10+json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) setSendingSuccessfully(true);
        else setSendingSuccessfully(false);
      });
    }
  };

  return (
    <>
      <div
        onClick={() => stateModal(false)}
        class="fixed top-0 left-0 w-screen h-screen z-40 flex items-center justify-center bg-[#042F4BCC]"
      >
      </div>

      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit z-50 flex items-center justify-center">
        <div class="max-w-[350px] relative flex flex-col items-start px-[20px] py-[30px] gap-[16px] isolate bg-white shadow-[-18px_14px_54px_#064269] rounded-[20px] lg:max-w-[512px]">
          <button
            class="absolute top-[10px] right-[10px]"
            onClick={() => stateModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M19.4133 11.9133L16.3254 15L19.4133 18.0867C19.5004 18.1738 19.5695 18.2772 19.6166 18.391C19.6638 18.5048 19.688 18.6268 19.688 18.75C19.688 18.8732 19.6638 18.9952 19.6166 19.109C19.5695 19.2228 19.5004 19.3262 19.4133 19.4133C19.3262 19.5004 19.2228 19.5695 19.109 19.6166C18.9952 19.6638 18.8732 19.688 18.75 19.688C18.6268 19.688 18.5048 19.6638 18.391 19.6166C18.2772 19.5695 18.1738 19.5004 18.0867 19.4133L15 16.3254L11.9133 19.4133C11.8262 19.5004 11.7228 19.5695 11.609 19.6166C11.4952 19.6638 11.3732 19.688 11.25 19.688C11.1268 19.688 11.0048 19.6638 10.891 19.6166C10.7772 19.5695 10.6738 19.5004 10.5867 19.4133C10.4996 19.3262 10.4305 19.2228 10.3834 19.109C10.3362 18.9952 10.312 18.8732 10.312 18.75C10.312 18.6268 10.3362 18.5048 10.3834 18.391C10.4305 18.2772 10.4996 18.1738 10.5867 18.0867L13.6746 15L10.5867 11.9133C10.4108 11.7374 10.312 11.4988 10.312 11.25C10.312 11.0012 10.4108 10.7626 10.5867 10.5867C10.7626 10.4108 11.0012 10.312 11.25 10.312C11.4988 10.312 11.7374 10.4108 11.9133 10.5867L15 13.6746L18.0867 10.5867C18.1738 10.4996 18.2772 10.4305 18.391 10.3834C18.5048 10.3362 18.6268 10.312 18.75 10.312C18.8732 10.312 18.9952 10.3362 19.109 10.3834C19.2228 10.4305 19.3262 10.4996 19.4133 10.5867C19.5004 10.6738 19.5695 10.7772 19.6166 10.891C19.6638 11.0048 19.688 11.1268 19.688 11.25C19.688 11.3732 19.6638 11.4952 19.6166 11.609C19.5695 11.7228 19.5004 11.8262 19.4133 11.9133ZM27.1875 15C27.1875 17.4105 26.4727 19.7668 25.1335 21.771C23.7944 23.7752 21.8909 25.3373 19.664 26.2598C17.437 27.1822 14.9865 27.4236 12.6223 26.9533C10.2582 26.4831 8.08659 25.3223 6.38214 23.6179C4.67769 21.9134 3.51694 19.7418 3.04668 17.3777C2.57643 15.0135 2.81778 12.563 3.74022 10.336C4.66267 8.10907 6.22477 6.20564 8.22899 4.86646C10.2332 3.52728 12.5895 2.8125 15 2.8125C18.2313 2.81591 21.3292 4.10104 23.6141 6.3859C25.899 8.67076 27.1841 11.7687 27.1875 15ZM25.3125 15C25.3125 12.9604 24.7077 10.9666 23.5745 9.27068C22.4414 7.5748 20.8308 6.25302 18.9464 5.47249C17.0621 4.69196 14.9886 4.48774 12.9881 4.88565C10.9877 5.28356 9.1502 6.26573 7.70797 7.70796C6.26574 9.15019 5.28357 10.9877 4.88566 12.9881C4.48775 14.9886 4.69197 17.0621 5.4725 18.9464C6.25303 20.8308 7.5748 22.4414 9.27069 23.5745C10.9666 24.7077 12.9604 25.3125 15 25.3125C17.7341 25.3094 20.3553 24.2219 22.2886 22.2886C24.2219 20.3553 25.3094 17.7341 25.3125 15Z"
                fill="#8C8486"
              />
            </svg>
          </button>
          {!sendingSuccessfully && (
            <>
              <div class="w-full flex gap-[12px] items-center justify-center lg:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M20.0001 3.65H20C16.7663 3.65 13.6052 4.60891 10.9164 6.40547C8.22769 8.20203 6.13207 10.7556 4.89458 13.7431C3.65708 16.7307 3.3333 20.0181 3.96417 23.1897C4.59504 26.3613 6.15222 29.2746 8.43881 31.5612C10.7254 33.8478 13.6387 35.405 16.8103 36.0358C19.9819 36.6667 23.2693 36.3429 26.2569 35.1054C29.2445 33.8679 31.798 31.7723 33.5945 29.0836C35.3911 26.3948 36.35 23.2337 36.35 20V19.9999C36.3454 15.665 34.6214 11.509 31.5562 8.44383C28.491 5.37862 24.335 3.65458 20.0001 3.65ZM19.9999 33.65C17.3002 33.65 14.6612 32.8494 12.4165 31.3496C10.1717 29.8497 8.42219 27.7178 7.38905 25.2236C6.35592 22.7294 6.0856 19.9849 6.61229 17.337C7.13898 14.6892 8.43901 12.257 10.348 10.348C12.257 8.43901 14.6892 7.13897 17.337 6.61228C19.9849 6.08559 22.7294 6.35591 25.2236 7.38904C27.7178 8.42218 29.8497 10.1717 31.3496 12.4165C32.8494 14.6612 33.65 17.3002 33.65 19.9999C33.6459 23.6189 32.2065 27.0884 29.6474 29.6474C27.0884 32.2064 23.6189 33.6459 19.9999 33.65ZM25.0393 26.2893C25.8785 25.4501 26.35 24.3118 26.35 23.125C26.35 21.9382 25.8785 20.7999 25.0393 19.9607C24.2001 19.1215 23.0619 18.65 21.875 18.65H18.125C17.6542 18.65 17.2028 18.463 16.8699 18.1301C16.537 17.7972 16.35 17.3458 16.35 16.875C16.35 16.4042 16.537 15.9528 16.8699 15.6199C17.2028 15.287 17.6542 15.1 18.125 15.1H23.75C24.108 15.1 24.4514 14.9578 24.7046 14.7046C24.9578 14.4514 25.1 14.108 25.1 13.75C25.1 13.392 24.9578 13.0486 24.7046 12.7954C24.4514 12.5422 24.108 12.4 23.75 12.4H21.35V11.25C21.35 10.892 21.2078 10.5486 20.9546 10.2954C20.7014 10.0422 20.358 9.9 20 9.9C19.642 9.9 19.2986 10.0422 19.0454 10.2954C18.7922 10.5486 18.65 10.892 18.65 11.25V12.4H18.125C16.9382 12.4 15.7999 12.8715 14.9607 13.7107C14.1215 14.5499 13.65 15.6882 13.65 16.875C13.65 18.0618 14.1215 19.2001 14.9607 20.0393C15.7999 20.8785 16.9382 21.35 18.125 21.35H21.875C22.3458 21.35 22.7972 21.537 23.1301 21.8699C23.463 22.2028 23.65 22.6542 23.65 23.125C23.65 23.5958 23.463 24.0472 23.1301 24.3801C22.7972 24.713 22.3458 24.9 21.875 24.9H16.25C15.892 24.9 15.5486 25.0422 15.2954 25.2954C15.0422 25.5486 14.9 25.892 14.9 26.25C14.9 26.608 15.0422 26.9514 15.2954 27.2046C15.5486 27.4578 15.892 27.6 16.25 27.6H18.65V28.75C18.65 29.108 18.7922 29.4514 19.0454 29.7046C19.2986 29.9578 19.642 30.1 20 30.1C20.358 30.1 20.7014 29.9578 20.9546 29.7046C21.2078 29.4514 21.35 29.108 21.35 28.75V27.6H21.875C23.0619 27.6 24.2001 27.1285 25.0393 26.2893Z"
                    fill="#015388"
                    stroke="#015388"
                    stroke-width="0.2"
                  />
                </svg>
                <span class="not-italic font-medium text-[24px] lg:text-[28px] lg:leading-[30px] leading-[28px] text-[#015388]">
                  Solicite um orçamento!
                </span>
              </div>
              <form onSubmit={handleSubmit} class="flex flex-col gap-[16px]">
                <div class="flex flex-col gap-[12px] w-full">
                  <div class="flex flex-col items-start justify-start gap-[6px]">
                    <label
                      class="not-italic font-medium text-[14px] leading-[20px] text-[#484849]"
                      htmlFor="product"
                    >
                      Produto
                    </label>
                    <input
                      value={product}
                      class={`not-italic font-normal text-[14px] leading-[20px] text-[#9B9B9E] flex flex-row items-center px-[20px] py-[11px] h-[42px] bg-white border ${inputNormalStyle} rounded-[16px] w-full`}
                      id="product"
                      disabled
                    />
                  </div>

                  <div class="flex flex-col gap-[12px] lg:flex-row lg:gap-[16px]">
                    <div class="flex flex-col items-start justify-start gap-[6px]">
                      <label
                        class="not-italic font-medium text-[14px] leading-[20px] text-[#484849]"
                        htmlFor="name"
                      >
                        Nome
                      </label>
                      <input
                        onChange={(e) => setUserName(e.currentTarget.value)}
                        value={userName}
                        placeholder="Digite seu nome"
                        class={`not-italic font-normal text-[14px] leading-[20px] text-[#9B9B9E] flex flex-row items-center px-[20px] py-[11px] h-[42px] bg-white border ${
                          errors.userName ? inputErrorStyle : inputNormalStyle
                        } rounded-[16px] w-full`}
                        id="name"
                      />
                    </div>

                    <div class="flex flex-col items-start justify-start gap-[6px]">
                      <label
                        class="not-italic font-medium text-[14px] leading-[20px] text-[#484849]"
                        htmlFor="surname"
                      >
                        Sobrenome
                      </label>
                      <input
                        onChange={(e) => setSurName(e.currentTarget.value)}
                        value={surname}
                        placeholder="Digite seu sobrenome"
                        class={`not-italic font-normal text-[14px] leading-[20px] text-[#9B9B9E] flex flex-row items-center px-[20px] py-[11px] h-[42px] bg-white border ${
                          errors.surname ? inputErrorStyle : inputNormalStyle
                        } rounded-[16px] w-full`}
                        id="surname"
                      />
                    </div>
                  </div>

                  <div class="flex gap-[8px] lg:gap-[16px]">
                    <div class="flex flex-col items-start justify-start gap-[6px]">
                      <label
                        class="not-italic font-medium text-[14px] leading-[20px] text-[#484849]"
                        htmlFor="tel"
                      >
                        Telefone
                      </label>
                      <input
                        onChange={(e) => setTel(e.currentTarget.value)}
                        value={tel}
                        placeholder="(xx) xxxxx-xxxx"
                        class={`not-italic font-normal text-[14px] leading-[20px] text-[#9B9B9E] flex flex-row items-center px-[20px] py-[11px] h-[42px] bg-white border ${
                          errors.tel ? inputErrorStyle : inputNormalStyle
                        } rounded-[16px] w-full`}
                        id="tel"
                      />
                    </div>

                    <div class="flex flex-col items-start justify-start gap-[6px]">
                      <label
                        class="not-italic font-medium text-[14px] leading-[20px] text-[#484849]"
                        htmlFor="email"
                      >
                        E-mail
                      </label>
                      <input
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        value={email}
                        placeholder="Seu melhor e-mail"
                        class={`not-italic font-normal text-[14px] leading-[20px] text-[#9B9B9E] flex flex-row items-center px-[20px] py-[11px] h-[42px] bg-white border ${
                          errors.email ? inputErrorStyle : inputNormalStyle
                        } rounded-[16px] w-full`}
                        id="email"
                      />
                    </div>
                  </div>

                  <div class="flex flex-col items-start justify-start gap-[6px]">
                    <label
                      class="not-italic font-medium text-[14px] leading-[20px] text-[#484849]"
                      htmlFor="quantity"
                    >
                      Quantidade
                    </label>
                    <input
                      onChange={(e) => setQuantity(e.currentTarget.value)}
                      value={quantity}
                      type="number"
                      class={`not-italic font-normal text-[14px] leading-[20px] text-[#9B9B9E] flex flex-row items-center px-[20px] py-[11px] h-[42px] bg-white border ${
                        errors.quantity ? inputErrorStyle : inputNormalStyle
                      } rounded-[16px] w-full`}
                      id="quantity"
                    />
                  </div>

                  <div class="flex flex-col items-start justify-start gap-[6px]">
                    <label
                      class="not-italic font-medium text-[14px] leading-[20px] text-[#484849]"
                      htmlFor="observer"
                    >
                      Observação
                    </label>
                    <textarea
                      onChange={(e) => setObs(e.currentTarget.value)}
                      value={obs}
                      id="observer"
                      class={`w-full flex flex-row items-start px-[20px] py-[11px] h-[175px] bg-white border ${
                        errors.obs ? inputErrorStyle : inputNormalStyle
                      } rounded-[16px] not-italic font-normal text-[14px] leading-[20px] text-[#9B9B9E]`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="w-full flex flex-row justify-center items-center p-[16px] gap-[8px] bg-[#015388] border-2 border-[#015388] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-full not-italic font-bold text-[16px] leading-[16px] text-center uppercase text-white "
                >
                  ENVIAR
                </button>
              </form>
            </>
          )}
          {sendingSuccessfully && (
            <SendingSuccessfullyModal stateModal={stateModal} />
          )}
        </div>
      </div>
    </>
  );
}

export default FormRequestQuote;
