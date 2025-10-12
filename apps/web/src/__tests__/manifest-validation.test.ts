/**
 * Manifest Validation Tests
 * 
 * Tests for validating ChatGPT plugin manifest and PWA manifest
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_DIR = path.join(__dirname, '../../public');

describe('PWA Manifest Validation', () => {
  it('should have a valid site.webmanifest file', () => {
    const manifestPath = path.join(PUBLIC_DIR, 'site.webmanifest');
    expect(fs.existsSync(manifestPath)).toBe(true);
    
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    // Required fields
    expect(manifest.name).toBeDefined();
    expect(manifest.short_name).toBeDefined();
    expect(manifest.start_url).toBeDefined();
    expect(manifest.display).toBeDefined();
    expect(manifest.background_color).toBeDefined();
    expect(manifest.theme_color).toBeDefined();
    
    // Icons
    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThan(0);
    
    manifest.icons.forEach((icon: any) => {
      expect(icon.src).toBeDefined();
      expect(icon.sizes).toBeDefined();
      expect(icon.type).toBeDefined();
    });
  });

  it('should have proper manifest name and description', () => {
    const manifestPath = path.join(PUBLIC_DIR, 'site.webmanifest');
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.name).toBe('The Last Collection');
    expect(manifest.description).toContain('New World Kids');
  });

  it('should have valid display mode for PWA', () => {
    const manifestPath = path.join(PUBLIC_DIR, 'site.webmanifest');
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    const validDisplayModes = ['fullscreen', 'standalone', 'minimal-ui', 'browser'];
    expect(validDisplayModes).toContain(manifest.display);
  });

  it('should have app shortcuts defined', () => {
    const manifestPath = path.join(PUBLIC_DIR, 'site.webmanifest');
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(Array.isArray(manifest.shortcuts)).toBe(true);
    expect(manifest.shortcuts.length).toBeGreaterThan(0);
    
    manifest.shortcuts.forEach((shortcut: any) => {
      expect(shortcut.name).toBeDefined();
      expect(shortcut.url).toBeDefined();
    });
  });
});

describe('ChatGPT Plugin Manifest Validation', () => {
  it('should have a valid ai-plugin.json file', () => {
    const pluginManifestPath = path.join(PUBLIC_DIR, '.well-known/ai-plugin.json');
    expect(fs.existsSync(pluginManifestPath)).toBe(true);
    
    const manifestContent = fs.readFileSync(pluginManifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    // Required fields for ChatGPT plugin
    expect(manifest.schema_version).toBe('v1');
    expect(manifest.name_for_human).toBeDefined();
    expect(manifest.name_for_model).toBeDefined();
    expect(manifest.description_for_human).toBeDefined();
    expect(manifest.description_for_model).toBeDefined();
    expect(manifest.auth).toBeDefined();
    expect(manifest.api).toBeDefined();
    expect(manifest.logo_url).toBeDefined();
    expect(manifest.contact_email).toBeDefined();
    expect(manifest.legal_info_url).toBeDefined();
    expect(manifest.privacy_policy_url).toBeDefined();
  });

  it('should have proper plugin name and description', () => {
    const pluginManifestPath = path.join(PUBLIC_DIR, '.well-known/ai-plugin.json');
    const manifestContent = fs.readFileSync(pluginManifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.name_for_human).toBe('The Last Collection');
    expect(manifest.name_for_model).toBe('last_collection');
    expect(manifest.description_for_model).toContain('circular economy');
  });

  it('should have valid API configuration', () => {
    const pluginManifestPath = path.join(PUBLIC_DIR, '.well-known/ai-plugin.json');
    const manifestContent = fs.readFileSync(pluginManifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.api.type).toBe('openapi');
    expect(manifest.api.url).toBeDefined();
    expect(manifest.api.url).toContain('openapi.yaml');
  });

  it('should have valid contact and legal URLs', () => {
    const pluginManifestPath = path.join(PUBLIC_DIR, '.well-known/ai-plugin.json');
    const manifestContent = fs.readFileSync(pluginManifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.contact_email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(manifest.legal_info_url).toContain('/terms');
    expect(manifest.privacy_policy_url).toContain('/privacy');
  });
});

describe('OpenAPI Specification Validation', () => {
  it('should have a valid openapi.yaml file', () => {
    const openapiPath = path.join(PUBLIC_DIR, '.well-known/openapi.yaml');
    expect(fs.existsSync(openapiPath)).toBe(true);
    
    const content = fs.readFileSync(openapiPath, 'utf-8');
    expect(content).toContain('openapi: 3.0');
    expect(content).toContain('paths:');
  });

  it('should define plugin endpoints', () => {
    const openapiPath = path.join(PUBLIC_DIR, '.well-known/openapi.yaml');
    const content = fs.readFileSync(openapiPath, 'utf-8');
    
    // Check for required endpoints
    expect(content).toContain('/plugin/auctions');
    expect(content).toContain('/plugin/donate/guidelines');
    expect(content).toContain('/plugin/commission/info');
    expect(content).toContain('/plugin/faq');
    expect(content).toContain('/plugin/search');
    expect(content).toContain('/plugin/region/info');
  });

  it('should define operations with operationId', () => {
    const openapiPath = path.join(PUBLIC_DIR, '.well-known/openapi.yaml');
    const content = fs.readFileSync(openapiPath, 'utf-8');
    
    expect(content).toContain('operationId:');
  });
});

describe('Manifest Security & Privacy', () => {
  it('should not expose secrets in plugin manifest', () => {
    const pluginManifestPath = path.join(PUBLIC_DIR, '.well-known/ai-plugin.json');
    const manifestContent = fs.readFileSync(pluginManifestPath, 'utf-8');
    
    // Check for common secret patterns
    expect(manifestContent).not.toMatch(/api[_-]?key/i);
    expect(manifestContent).not.toMatch(/secret/i);
    expect(manifestContent).not.toMatch(/password/i);
    expect(manifestContent).not.toMatch(/token/i);
  });

  it('should have privacy policy and terms links', () => {
    const pluginManifestPath = path.join(PUBLIC_DIR, '.well-known/ai-plugin.json');
    const manifestContent = fs.readFileSync(pluginManifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    expect(manifest.privacy_policy_url).toBeTruthy();
    expect(manifest.legal_info_url).toBeTruthy();
  });
});
