import process from 'node:process';
import { loadConfig } from 'c12';
import type { CliOption } from '../types';

const defaultOptions: CliOption = {
  cwd: process.cwd(),
  cleanupDirs: [
    '**/dist',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
    '**/node_modules',
    '!node_modules/**'
  ],
  gitCommitTypes: [
    ['feat', 'A new feature（添加新特性）'],
    ['fix', 'A bug fix（修复了一个bug）'],
    ['docs', 'Documentation only changes（只包含文档更改）'],
    ['style', 'Changes that do not affect the meaning of the code（代码更改不影响代码逻辑，仅涉及样式或格式）'],
    [
      'refactor',
      'A code change that neither fixes a bug nor adds a feature（重构了代码，既没有修复bug也没有添加新功能）'
    ],
    ['perf', 'A code change that improves performance（性能优化，提高了代码的运行速度或资源使用效率）'],
    ['optimize', 'A code change that optimizes code quality（优化了代码质量，可能包括代码重构、减少重复代码等）'],
    ['test', 'Adding missing tests or correcting existing tests（添加了缺失的测试或修正了现有的测试）'],
    ['build', 'Changes that affect the build system or external dependencies（更改了构建系统或外部依赖项）'],
    ['ci', 'Changes to our CI configuration files and scripts（更改了持续集成（CI）配置文件或脚本）'],
    ['chore', "Other changes that don't modify src or test files（其他类型的更改，这些更改不修改源代码或测试文件）"],
    ['revert', 'Reverts a previous commit（撤销了之前的某个提交）']
  ],
  gitCommitScopes: [
    ['projects', 'project'],
    ['packages', 'packages'],
    ['components', 'components'],
    ['hooks', 'hook functions'],
    ['utils', 'utils functions'],
    ['types', 'TS declaration'],
    ['styles', 'style'],
    ['deps', 'project dependencies'],
    ['release', 'release project'],
    ['other', 'other changes']
  ],
  ncuCommandArgs: ['--deep', '-u'],
  changelogOptions: {}
};

export async function loadCliOptions(overrides?: Partial<CliOption>, cwd = process.cwd()) {
  const { config } = await loadConfig<Partial<CliOption>>({
    name: 'soybean',
    defaults: defaultOptions,
    overrides,
    cwd,
    packageJson: true
  });

  return config as CliOption;
}
