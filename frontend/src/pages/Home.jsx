
import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import {
  FiArrowUpRight,
  FiCheck,
  FiCode,
  FiFileText,
  FiImage,
  FiLayers,
  FiSearch,
  FiShield,
  FiZap,
} from "react-icons/fi";

import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice";

import SideBar from "../components/SideBar";
import ChatArea from "../components/ChatArea";
import Artifact from "../components/Artifact";

const features = [
  {
    icon: FiSearch,
    title: "Smart Search",
    description: "Find answers and explore ideas.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: FiCode,
    title: "AI Coding",
    description: "Build, debug, and improve code.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: FiFileText,
    title: "PDF & PPT",
    description: "Create documents and presentations.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: FiImage,
    title: "Image Creation",
    description: "Turn your ideas into visuals.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (token) => {
    const { data } = await api.post("/api/auth/login", { token });
    dispatch(setUserdata(data));
  };

  const googleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      await handleLogin(token);
    } catch (error) {
      console.error("Login error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setErrorMessage("Sign-in was cancelled. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        setErrorMessage("Your browser blocked the sign-in popup.");
      } else {
        setErrorMessage(
          error.response?.data?.message ||
            "Unable to sign in. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex h-dvh overflow-hidden bg-[#090b10] text-white">
      {/* Main Agentix workspace */}
      <div className="flex min-w-0 flex-1">
        <SideBar />

        <div className="flex min-w-0 flex-1">
          <ChatArea />
          <Artifact />
        </div>
      </div>

      {/* Login overlay */}
      {!userData && (
        <section
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#05060a]/80 p-4 backdrop-blur-xl sm:p-6"
          aria-label="Agentix sign in"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

          <div className="relative my-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/[0.10] bg-[#0d1018] shadow-[0_30px_120px_rgba(0,0,0,0.65)] lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left: Branding and features */}
            <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/[0.08] p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-[80px]" />

              <div className="relative">
                {/* Logo */}
                <div className="mb-12 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-900/30">
                    <FiLayers size={23} />
                  </div>

                  <div>
                    <h1 className="text-xl font-bold tracking-tight">
                      Agentix
                      <span className="ml-1.5 text-violet-400">AI</span>
                    </h1>
                    <p className="text-[11px] tracking-[0.2em] text-slate-500">
                      YOUR AI WORKSPACE
                    </p>
                  </div>
                </div>

                {/* Main heading */}
                <div className="mb-9">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3 py-1.5 text-xs text-violet-300">
                    <FiZap />
                    One workspace. Multiple AI capabilities.
                  </div>

                  <h2 className="max-w-md text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">
                    Your ideas,
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                      powered by AI.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                    Search smarter, write code, generate documents, and
                    create visuals — all from one intelligent workspace.
                  </p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.title}
                        className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-200 hover:border-white/[0.15] hover:bg-white/[0.05]"
                      >
                        <div
                          className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${feature.bg} ${feature.color}`}
                        >
                          <Icon size={19} />
                        </div>

                        <h3 className="text-sm font-medium text-slate-100">
                          {feature.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {feature.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative mt-10 hidden items-center gap-2 text-xs text-slate-500 sm:flex">
                <FiShield className="text-emerald-400" />
                <span>Sign in securely to access your workspace.</span>
              </div>
            </div>

            {/* Right: Login */}
            <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <div className="absolute right-8 top-8 hidden h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.6)] sm:block" />

              <div className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-violet-400">
                  Get started
                </p>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Welcome to Agentix
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                  Sign in to start working with your personal AI workspace.
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-8 space-y-4">
                {[
                  "Access your AI-powered workspace",
                  "Work with coding and search tools",
                  "Generate PDFs and presentations",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                      <FiCheck size={12} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              {/* Google login */}
              <button
                type="button"
                onClick={googleLogin}
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#171923] transition duration-200 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    <FcGoogle size={21} />
                    Continue with Google
                    <FiArrowUpRight
                      size={17}
                      className="ml-auto text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>

              {errorMessage && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-red-400/20 bg-red-400/[0.07] p-3 text-sm text-red-300"
                >
                  {errorMessage}
                </p>
              )}

              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-[11px] uppercase tracking-wider text-slate-600">
                  AI, all in one place
                </span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              <p className="text-center text-xs leading-6 text-slate-500">
                By continuing, you agree to use Agentix responsibly and
                protect your account credentials.
              </p>

              <div className="mt-10 border-t border-white/[0.07] pt-5 text-center text-xs text-slate-600">
                © {new Date().getFullYear()} Agentix. Built for productivity.
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;
