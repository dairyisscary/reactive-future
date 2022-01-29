import { createSignal, createMemo, createEffect } from "solid-js";
import { render } from "solid-js/web";

function ButtonCounter(props: { count: number; onClick: () => void }) {
  return (
    <div class="flex justify-center items-center space-y-2 flex-col text-xl">
      <span id="countlabel">The Count</span>
      <button
        type="button"
        class="bg-sky-500 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 text-white font-semibold py-3 px-6 rounded-lg"
        aria-describedby="countlabel"
        onClick={props.onClick}
      >
        {props.count}
      </button>
    </div>
  );
}

function WinnerDisplay(props: { count: number }) {
  return (
    <div
      class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-5"
      role="alert"
    >
      <p class="text-xl font-bold">You've won!</p>
      <p class="pt-2">Nice work getting all the way to {props.count}.</p>
    </div>
  );
}

function ReactiveApp() {
  const [count, setCount] = createSignal(0);

  const isWinner = createMemo(() => count() === 5);

  const originalTitle = document.title;
  createEffect(() => {
    document.title = isWinner()
      ? `You're a winner, homie! | ${originalTitle}`
      : originalTitle;
  });

  return (
    <>
      <main class="flex flex-col items-center justify-center flex-1">
        {isWinner() && <WinnerDisplay count={count()} />}
        <ButtonCounter count={count()} onClick={() => setCount(count() + 1)} />
      </main>
    </>
  );
}

const cleanup = render(ReactiveApp, document.getElementById("root")!);
if (import.meta.hot) {
  import.meta.hot.dispose(cleanup);
}
