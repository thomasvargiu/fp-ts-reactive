import { left, right } from 'fp-ts/Either'
import type * as TE from 'fp-ts/TaskEither'
import * as child_process from 'child_process'
import { run } from './run'

const DIST = 'dist'

const exec =
    (cmd: string, args?: child_process.ExecOptions): TE.TaskEither<Error, void> =>
    () =>
        new Promise(resolve => {
            child_process.exec(cmd, args, err => {
                if (err !== null) {
                    return resolve(left(err))
                }

                return resolve(right(undefined))
            })
        })

export const main = exec('npm publish', {
    cwd: DIST,
})

run(main)
