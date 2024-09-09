import { googleSignInAction } from "@/app/_lib/actions";

export default function GoogleLoginButton() {
    return (
        <form className="h-full" action={googleSignInAction}>
      <button className="mx-auto my-auto  flex items-center gap-6 text-lg border border-gray-400 px-10 py-4 font-medium hover:bg-slate-200 rounded-md">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Login with Google</span>
      </button>
    </form>
    )
}