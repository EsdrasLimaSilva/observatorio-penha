import { Header } from "@/components/Header";

export function HowToUse() {
    return (
        <main className="bg-page">
            <Header />

            <section className="pt-[200px] min-h-screen p-8 flex flex-col gap-8 text-background max-w-[500px] mx-auto">
                <h2 className="text-2xl font-bold text-primary">Como usar</h2>

                <p>
                    Este site é um projeto criado com o objetivo de
                    conscientizar e estimular a população a denúnciar qualquer
                    tipo de violência contra a mulher.
                </p>

                <p>
                    Para criar uma ocorrência nova basta clicar ou pressionar(no
                    celular) qualquer ponto do mapa, aparecerá um pop-up de
                    confirmação e basta você confirmar para registrar o evento.
                </p>

                <p>
                    Caso haja algum evento próximo de você, você pode dar um
                    impulso, uma espécie de 'like' das redes sociais. Aumentando
                    a credibilidade da denúncia.
                </p>
            </section>
        </main>
    );
}
