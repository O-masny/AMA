"use client";

import CTAButton from "@/components/ui/CTAButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";

type ContactProps = {
    standalone?: boolean;
};

const Contact: React.FC<ContactProps> = ({ standalone = false }) => {
    const { t } = useTranslation("common");
    const ref = useRef<HTMLElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const targetRef = ref.current ? ({ current: ref.current } as React.RefObject<HTMLElement>) : undefined;

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // scroll-motion
    const step1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const step2 = useTransform(scrollYProgress, [0.3, 0.45, 0.55], [0, 1, 0]);
    const step3 = useTransform(scrollYProgress, [0.55, 0.7, 0.8], [0, 1, 0]);
    const formOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
    const hue = useTransform(scrollYProgress, [0, 1], [0, 90]);
    const filter = useMotionTemplate`hue-rotate(${hue}deg)`;

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("contact.send"));
    };

    // if standalone, focus the name input on mount
    useEffect(() => {
        if (standalone) {
            setTimeout(() => nameRef.current?.focus(), 120);
        }
    }, [standalone]);

    if (standalone) {
        // Compact standalone form page
        return (
            <section id="contact" className="relative py-20 min-h-screen flex items-center bg-background text-foreground">
                <div className="max-w-3xl mx-auto w-full px-6">
                    <div className="mb-8 text-center">
                        <h1 className="font-display huge-heading font-extrabold mb-4">{t("contact.form.heading")}</h1>
                        <p className="text-muted-foreground">{t("contact.form.subheading", "Máš dotaz?")}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                ref={nameRef as any}
                                placeholder={t("contact.form.name")}
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="rounded-xl bg-white/6 border border-white/10 focus:ring-2 focus:ring-primary/50 text-lg py-4"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                            <Input
                                type="email"
                                placeholder={t("contact.form.email")}
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="rounded-xl bg-white/6 border border-white/10 focus:ring-2 focus:ring-primary/50 text-lg py-4"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <Textarea
                            rows={8}
                            placeholder={t("contact.form.message")}
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            className="rounded-xl bg-white/6 border border-white/10 focus:ring-2 focus:ring-primary/50 text-lg resize-none py-4"
                        />
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

                        <p className="text-xs text-muted-foreground">
                            <Trans
                                i18nKey="contact.form.privacy"
                                components={{
                                    1: (
                                        <a href="/privacy" className="underline hover:text-primary">
                                            _
                                        </a>
                                    ),
                                }}
                            />
                        </p>

                        <div className="flex justify-center">
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <CTAButton type="submit" disabled={processing}>
                                    {processing ? t("contact.form.sending") : t("contact.form.send")}
                                </CTAButton>
                            </motion.div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }

    return (
        <section ref={ref} id="contact" className="relative h-[300vh]">
            {/* background blobs */}
            <motion.div
                className="absolute -top-20 -left-20 w-96 h-96 bg-art-rose/40 rounded-full blur-3xl"
                style={{ filter }}
            />
            <motion.div
                className="absolute top-40 right-0 w-[28rem] h-[28rem] bg-art-mint/30 rounded-full blur-3xl"
                style={{ filter }}
            />

            <div className="sticky top-0 h-screen">
                {/* Step 1 */}
                <motion.div
                    style={{ opacity: step1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4"
                >
                    <h3 className="font-display huge-heading font-extrabold text-primary">
                        {t("contact.steps.email.title")}
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        {t("contact.steps.email.value")}
                    </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                    style={{ opacity: step2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4"
                >
                    <h3 className="font-display huge-heading font-extrabold text-primary">
                        {t("contact.steps.phone.title")}
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        {t("contact.steps.phone.value")}
                    </p>
                </motion.div>



                {/* Form */}
                <motion.div
                    style={{ opacity: formOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-6"
                >
                    <h3 className="font-display huge-display font-extrabold text-center text-foreground mb-12">
                        {t("contact.form.heading")}
                    </h3>

                    <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                ref={nameRef as any}
                                placeholder={t("contact.form.name")}
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary/50 text-lg py-4"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                            <Input
                                type="email"
                                placeholder={t("contact.form.email")}
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary/50 text-lg py-4"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <Textarea
                            rows={8}
                            placeholder={t("contact.form.message")}
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            className="rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-primary/50 text-lg resize-none py-4"
                        />
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

                        <p className="text-xs text-muted-foreground text-center">
                            <Trans
                                i18nKey="contact.form.privacy"
                                components={{
                                    1: (
                                        <a href="/privacy" className="underline hover:text-primary">
                                            _
                                        </a>
                                    ),
                                }}
                            />
                        </p>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <CTAButton type="submit" disabled={processing}>
                                {processing ? t("contact.form.sending") : t("contact.form.send")}
                            </CTAButton>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
