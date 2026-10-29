#!/usr/bin/env node
/**
 * Setup Claude Code skills on Windows (copy, not symlink)
 *
 * Windows symlinks require admin or Developer Mode.
 * This script copies skills instead of linking them.
 *
 * Trade-off: Must re-run after updating harness/skills/
 */

import { readdir, copyFile, mkdir, rm } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..')
const CLAUDE_SKILLS = join(REPO_ROOT, '.claude/skills')
const HARNESS_SKILLS = join(REPO_ROOT, 'harness/skills')

async function setupClaudeSkillsWindows() {
  console.log('📋 Setting up Claude Code skills bridge (Windows copy mode)...\n')

  // Create .claude/skills if it doesn't exist
  await mkdir(CLAUDE_SKILLS, { recursive: true })

  // Read all skill directories
  const skillDirs = await readdir(HARNESS_SKILLS, { withFileTypes: true })
  const skills = skillDirs.filter((d) => d.isDirectory())

  let successCount = 0
  let skipCount = 0

  for (const skill of skills) {
    const skillName = skill.name
    const sourceDir = join(HARNESS_SKILLS, skillName)
    const sourceSKILL = join(sourceDir, 'SKILL.md')
    const targetDir = join(CLAUDE_SKILLS, skillName)
    const targetSKILL = join(targetDir, 'SKILL.md')

    // Check if SKILL.md exists
    if (!existsSync(sourceSKILL)) {
      console.log(`⚠️  Skipping ${skillName} (no SKILL.md)`)
      skipCount++
      continue
    }

    try {
      // Remove existing target dir if exists
      if (existsSync(targetDir)) {
        await rm(targetDir, { recursive: true, force: true })
      }

      // Create target directory
      await mkdir(targetDir, { recursive: true })

      // Copy SKILL.md
      await copyFile(sourceSKILL, targetSKILL)

      // Copy references/ folder if it exists
      const referencesSource = join(sourceDir, 'references')
      if (existsSync(referencesSource)) {
        const referencesTarget = join(targetDir, 'references')
        await mkdir(referencesTarget, { recursive: true })

        const refFiles = await readdir(referencesSource, { withFileTypes: true })
        for (const refFile of refFiles) {
          if (refFile.isFile()) {
            await copyFile(join(referencesSource, refFile.name), join(referencesTarget, refFile.name))
          }
        }
      }

      console.log(`✅ ${skillName}`)
      successCount++
    } catch (err) {
      console.log(`❌ Failed: ${skillName} - ${err.message}`)
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 Summary:')
  console.log(`   Total skills: ${skills.length}`)
  console.log(`   Copied: ${successCount}`)
  console.log(`   Skipped: ${skipCount}\n`)

  if (successCount > 0) {
    console.log('✨ Claude Code skills bridge ready!')
    console.log('\nVerify in Claude Code:')
    console.log('  /skills\n')
    console.log('⚠️  Note: These are copies, not links.')
    console.log('   Re-run this script after updating harness/skills/\n')
  } else {
    console.log('❌ No skills were copied. Check harness/skills/ directory.')
    process.exit(1)
  }
}

setupClaudeSkillsWindows().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
