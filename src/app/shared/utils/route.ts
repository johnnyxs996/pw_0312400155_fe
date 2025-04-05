import { ActivatedRoute } from '@angular/router';

export function getAllPathParams(route: ActivatedRoute): { [key: string]: any } {
  let params: { [key: string]: any } = {};

  while (route) {
    if (route.snapshot) {
      params = { ...params, ...route.snapshot.params };
    }
    route = route.firstChild!;
  }

  return params;
}
