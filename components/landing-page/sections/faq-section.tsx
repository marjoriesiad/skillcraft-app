import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {faqData} from "@/data/home-data"

const FAQSection = () => {
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="faq">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          Questions fréquentes
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-terra-primary to-terra-secondary mx-auto mb-8"></div>
        <p className="text-white/60 text-xl max-w-2xl mx-auto font-light">
          Tout ce que vous devez savoir avant de commencer
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-secondary/50 rounded-lg bg-secondary/30 px-6 hover:bg-secondary/50 transition-colors duration-200"
          >
            <AccordionTrigger className="text-left text-white transition-colors duration-200 py-6 text-lg font-semibold cursor-pointer no-underline hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-white/70 leading-relaxed pb-6 text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQSection