import { DeleteButton } from "@/components/DeleteButton";
import { ICONTYPE } from "@/components/PokemonCard";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { getPokemon } from "../lib/data";

type Props = {
  params: {
    id: number;
  };
};

export default async function Pokemon({ params }: Props) {
  const pokemon = await getPokemon(params.id);

  if (!pokemon) throw new Error("Pokemon not found");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <Card className="min-w-96">
      <CardHeader className="flex flex-col items-center pb-0">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={120}
          height={120}
        />

        <CardTitle className="text-4xl">{pokemon?.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-2">
        <p className="text-xl">{ICONTYPE[pokemon.type as string]}</p>
        <p>{pokemon.type}</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-1">
        <Link href={`${pokemon.id}/edit`} className={buttonVariants()}>
          Modifier
        </Link>
        <DeleteButton id={pokemon.id} />
      </CardFooter>
    </Card>
  );
}
