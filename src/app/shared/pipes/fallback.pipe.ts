import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'fallback',
})

export class FallbackPipe implements PipeTransform {
    transform(value: any, fallback: string = '-'): string {
        return value != null && value !== '' ? value : fallback;
    }
}
