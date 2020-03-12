import { ObjectType, Field, Float } from 'type-graphql';

@ObjectType()
export class WeatherType {
    @Field(() => Float)
    temp: number;

    @Field(() => Float)
    feels_like: number;
}