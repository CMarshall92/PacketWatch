"use client"

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

import { faqs } from "@/data/faq";

import SectionTitle from "./SectionTitle";

const FAQ: React.FC = () => (
  <section id="faq" className="py-10 lg:py-20">
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="">
        <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>
        <SectionTitle>
          <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">Frequently Asked Questions</h2>
        </SectionTitle>
        <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
          Ask us anything!
        </p>
        <a href="mailto:" className="mt-3 block text-xl lg:text-4xl text-secondary font-semibold hover:underline text-center lg:text-left">help@finwise.com</a>
      </div>

      <div className="w-full lg:max-w-2xl mx-auto border-b">
        {faqs.map((faq) => (
          <Disclosure key={faq.question.replaceAll(' ', '')} as="div" className="mb-7">
            <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t group">
              <span className="text-2xl font-semibold">{faq.question}</span>
              <span className="text-2xl text-secondary group-data-[open]:rotate-45 transition-transform">+</span>
            </DisclosureButton>
            <DisclosurePanel className="px-4 pt-4 pb-2 text-foreground-accent">
              {faq.answer}
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
