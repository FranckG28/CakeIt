import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

/**
 * Boîte de dialogue : la boîte de dialogue qui apparait par dessus l'écran principal
 *
 * @component Modal
 *
 * @param   {bool} open  Etat du modal (ouvert/fermé)
 * @param   {string} emoji  Emoji affiché dans la boîte de dialogue
 * @param   {string} title   Titre affiché dans la boîte de dialgoue
 * @param   {Button[]} buttons  Liste de boutons a mettre dans la boîte de dialogue
 * @param   {function} onClose  Référence du composant
 *
 * @example
 * <Modal open={modalOpen} emoji={modalEmoji} title={modalTitle} buttons={Buttons} onClose={closeModal}>
 *     //modalContent
 * </Modal>
 *
 * @return {JSX} Le rendu jsx de la modal
 */
function Modal(props) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={props.focusedRef}
        onClose={props.onClose}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0 ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={
                "inline-block transform overflow-hidden rounded-xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
              }
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <h1 className="mt-4 text-center text-6xl">
                    <span role="img" aria-label="emoji">
                      {props.emoji}
                    </span>
                  </h1>
                  <div className="mt-5 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      {props.title}
                    </Dialog.Title>
                    <div className="mt-6">{props.children}</div>
                  </div>
                </div>
              </div>
              <div className={"bg-gray-50 px-4 " + props.paddingY ?? ""}>
                {props.buttons}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
